const express = require("express");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const axios = require("axios");
const axiosRetry = require("axios-retry").default;
const { db, admin } = require("../Firebase");
const sharp = require("sharp");

axiosRetry(axios, {
  retries: 3, // Retry up to 3 times
  retryDelay: axiosRetry.exponentialDelay,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const bills = []; // In-memory storage (replace with DB later)

module.exports = (cloudinary) => {
  const router = express.Router();

  // Amount Extraction Function with keyword + ₹ detection
  function extractAmount(text) {
    const lines = text.split(/\r?\n/);
    const amounts = [];
    const keywordAmounts = [];

    const keywordRegex =
      /(total|total amount|bill amount|amount|paid|payment|debited|₹|paid to|expense)\s*[:\-]?\s*([₹¥]??\s*\d{1,6}(?:\.\d{1,2})?)/i;
    const rupeeRegex = /([₹¥]?)\s*([\d,]+(?:\.\d{1,2})?)/g;

    for (const line of lines) {
      // Keyword-based extraction
      const keywordMatch = keywordRegex.exec(line);
      if (keywordMatch) {
        let amountStr = keywordMatch[2].replace(/[₹,\s]/g, "");
        const amount = parseFloat(amountStr);
        if (amount > 0 && amount < 1000000) {
          keywordAmounts.push(amount);
        }
      }

      // ₹ based extraction
      let match;
      while ((match = rupeeRegex.exec(line)) !== null) {
        const amount = parseFloat(match[2].replace(/,/g, ""));
        if (amount > 0 && amount < 1000000) {
          amounts.push(amount);
        }
      }
    }

    if (keywordAmounts.length > 0) return Math.max(...keywordAmounts);
    if (amounts.length > 0) return Math.max(...amounts);
    return null;
  }

  // Upload image file to Cloudinary → OCR → Store

  router.post("/process", upload.single("billImage"), async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ error: "No image uploaded" });

      // Step 1: Preprocess image with sharp
      const enhancedImage = await sharp(req.file.buffer)
        .grayscale()
        .resize(1000) // Resize for better OCR
        .normalize() // Enhance contrast
        .toBuffer();

      // Step 2: OCR with Tesseract
      const {
        data: { text },
      } = await Tesseract.recognize(enhancedImage, "eng", {
        tessedit_char_whitelist:
          "0123456789₹.,ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:- ",
      });

      console.log("OCR Extracted Text:\n", text);

      // Step 3: Send raw text to Python AI server
      let amount = null;
      let entities = [];

      try {
        const aiResponse = await axios.post(
          "http://127.0.0.1:5000/analyze-text",
          { text }
        );
        amount = aiResponse.data.amount;
        entities = aiResponse.data.entities;
        console.log("AI Analysis Result:", aiResponse.data);
      } catch (aiError) {
        console.error("AI server error:", aiError.message);
      }

      // Step 4: Upload to Cloudinary & Save to Firestore
      cloudinary.uploader
        .upload_stream(
          { folder: "ainalyze_uploads" },
          async (error, result) => {
            if (error)
              return res
                .status(500)
                .json({ error: "Cloudinary upload failed" });
            // Sanitize entities to avoid nested arrays
            const formattedEntities = Array.isArray(entities)
              ? entities.map((e) => ({ text: e[0], label: e[1] }))
              : [];

            const bill = {
              amount,
              rawText: text,
              imageUrl: result.secure_url,
              publicId: result.public_id,
              billName: result.original_filename,
              createdAt: admin.firestore.Timestamp.now(),
              entities,
            };

            try {
              const docRef = await db.collection("bills").add(bill);
              const savedDoc = await docRef.get();
              res.json({
                message: "Bill processed successfully",
                bill: { id: savedDoc.id, ...savedDoc.data() },
              });
            } catch (firestoreError) {
              console.error("Firestore save error:", firestoreError);
              res
                .status(500)
                .json({ error: "Failed to save bill to database" });
            }
          }
        )
        .end(enhancedImage);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to process image" });
    }
  });

  router.get("/", async (req, res) => {
    try {
      const snapshot = await db
        .collection("bills")
        .orderBy("createdAt", "desc")
        .get();
      const bills = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      res.json(bills);
    } catch (err) {
      console.error("Failed to fetch bills:", err.message);
      res.status(500).json({ error: "Failed to fetch bills" });
    }
  });

  // Process already uploaded image via URL → Download → OCR → Store
  router.post("/process-url", async (req, res) => {
    try {
      const { imageUrl, billName, publicId } = req.body;
      if (!imageUrl)
        return res.status(400).json({ error: "No image URL provided" });

      console.log(`Downloading image from: ${imageUrl}`);

      const imageResponse = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });
      console.log("Image downloaded, starting OCR...");

      const enhancedImage = await sharp(imageResponse.data)
        .grayscale()
        .resize(1000)
        .normalize()
        .toBuffer();

      const {
        data: { text },
      } = await Tesseract.recognize(enhancedImage, "eng", {
        tessedit_char_whitelist:
          "0123456789₹.,ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:- ",
      });

      console.log("OCR Extracted Text:\n", text);

      if (!text || text.trim().length === 0) {
        return res.status(200).json({ message: "No text found", imageUrl });
      }

      // Step: Send raw text to Python AI server
      let amount = null;
      let entities = [];

      try {
        const aiResponse = await axios.post(
          "http://127.0.0.1:5000/analyze-text",
          { text }
        );
        amount = aiResponse.data.amount;
        entities = aiResponse.data.entities;
        console.log("AI Analysis Result:", aiResponse.data);
      } catch (aiError) {
        console.error("AI server error:", aiError.message);
      }

      // Sanitize entities to avoid nested arrays
      const formattedEntities = Array.isArray(entities)
        ? entities.map((e) => ({ text: e[0], label: e[1] }))
        : [];

      const bill = {
        amount,
        rawText: text,
        imageUrl,
        publicId,
        billName,
        createdAt: new Date(),
        entities,
      };

      try {
        const docRef = await db.collection("bills").add(bill);
        res.json({
          message: "Bill processed successfully",
          bill: { id: docRef.id, ...bill },
        });
      } catch (firestoreError) {
        console.error("Firestore save error:", firestoreError);
        res.status(500).json({ error: "Failed to save bill to database" });
      }
    } catch (err) {
      console.error("Failed to process image:", err.message);
      res.status(500).json({ error: "Failed to process image" });
    }
  });

  return router;
};

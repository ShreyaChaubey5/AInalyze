import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadForm from "../Uploads/UploadForm";
import OCRPreview from "../Uploads/OCRPreview";
import UploadProgress from "../Uploads/UploadProgress";

export default function UploadBill() {
  const [file, setFile] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const backendUrl = "http://localhost:8080"; // Update for production if needed
  const navigate = useNavigate();

  const handleFileUpload = (selectedFile) => {
    setFile(selectedFile);
    setUploadProgress(0);
    setOcrText("");
    setSaveSuccess(false);

    if (selectedFile) {
      uploadToCloudinary(selectedFile);
    }
  };

  const uploadToCloudinary = async (selectedFile) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    console.log("Uploading file:", selectedFile);

    const data = new FormData();
    data.append("file", selectedFile);
    data.append("upload_preset", uploadPreset);
    data.append("folder", "ainalyze_uploads");

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();
      console.log("Cloudinary Response:", result);

      if (result.secure_url) {
        sendUrlToBackend(result.secure_url, result.public_id, result.original_filename);
      } else {
        alert("File upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  const sendUrlToBackend = async (imageUrl, publicId, billName) => {
    try {
      const response = await fetch(`${backendUrl}/api/bill/process-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, publicId, billName }),
      });

      if (!response.ok) throw new Error("Failed to process image");

      const data = await response.json();

      if (data.bill) {
        setOcrText(data.bill.rawText || "");
        setSaveSuccess(true);
        alert("Bill processed and saved successfully!");
        navigate("/dashboard");
      } else {
        alert("No text detected. Please try with a clearer image.");
      }
    } catch (error) {
      console.error("Error sending URL to backend:", error);
      alert("Failed to process bill. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">
        Upload Your Bill
      </h1>
      <UploadForm onFileSelect={handleFileUpload} />

      {file && <UploadProgress progress={uploadProgress} />}

      {ocrText && (
        <>
          <h2 className="text-lg font-semibold mt-6 mb-2">
            Extracted Text Preview:
          </h2>
          <OCRPreview text={ocrText} />
        </>
      )}

      {saveSuccess && (
        <p className="text-green-600 mt-4">
          Bill processed and saved successfully!
        </p>
      )}
    </div>
  );
}

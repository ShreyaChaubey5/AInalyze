const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const billRoutes = require('./routes/Bill');
const db=require("./Firebase");

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL during development
}));
app.use(express.json());

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Pass only Cloudinary to routes
app.use("/api/bill", billRoutes(cloudinary, db));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

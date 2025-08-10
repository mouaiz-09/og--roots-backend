const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// إعداد Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// إعداد التخزين في Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ogroots_products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// إضافة منتج
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "الاسم والسعر مطلوبين" });
    }

    const product = new Product({
      name: name.trim(),
      price: parseFloat(price),
      description: description || "",
      imageUrl: req.file ? req.file.path : "", // رابط Cloudinary
    });

    await product.save();
    res.status(201).json({ message: "تمت إضافة المنتج", product });
  } catch (err) {
    res.status(500).json({ message: "خطأ في السيرفر", error: err.message });
  }
});

// عرض كل المنتجات
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "خطأ في السيرفر" });
  }
});

module.exports = router;

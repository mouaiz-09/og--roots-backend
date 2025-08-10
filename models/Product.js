const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, default: "" },
  imageUrl: { type: String, default: "" }, // رابط الصورة من Cloudinary
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);

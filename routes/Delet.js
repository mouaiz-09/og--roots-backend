const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // موديل المنتج

// 🗑️ حذف منتج حسب الـ ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "❌ المنتج غير موجود" });
    }

    res.status(200).json({ message: "✅ المنتج تم حذفه بنجاح" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "❌ خطأ في السيرفر", error });
  }
});

module.exports = router;

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/product");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.get("/" , (req,res)=>{
  res.send('hello world')
})
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas conatted");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 the sever work in${PORT}`));
  })
  .catch((err) => console.error(" err in MongoDB:", err));

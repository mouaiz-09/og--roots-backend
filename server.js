require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/product");

const app = express();
app.use(cors());
app.use(express.json());
const MongoDb ="mongodb+srv://rlqyyn:M9BLoTiFA008jt1T@ogroots.yy9pfvh.mongodb.net/?retryWrites=true&w=majority&appName=ogroots "; 
const port = 5000
app.use("/api/products", productRoutes);
app.get("/" , (req,res)=>{
  res.send('hello world')
})
mongoose
  .connect(MongoDb)
  .then(() => {
    console.log("MongoDB Atlas conatted");
    const PORT = port || 5000;
    app.listen(PORT, () => console.log(`🚀 the sever work in${PORT}`));
  })
  .catch((err) => console.error(" err in MongoDB:", err));

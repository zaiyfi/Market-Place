require("dotenv").config();

// importing modules
const express = require("express");
const mongoose = require("mongoose");

// Rquiring other Components
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

// listening to requests
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("listening requests on port:", PORT));

// connecting to db
mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to DB");
});

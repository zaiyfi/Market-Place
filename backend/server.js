require("dotenv").config();

// importing modules
const express = require("express");
const mongoose = require("mongoose");

// Rquiring other Components
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
// express app
const app = express();

app.use(
  cors({
    origin: ["https://market-place-th6b-hjibgniu8-zaiyfi.vercel.app/"],
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true,
  })
);

// middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// deployment config
const path = require("path");
__dirname = path.resolve();
// Render Deployment
if (process.env.NODE_ENV === "productions") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}

// listening to requests
const PORT = process.env.PORT;
app.listen(PORT, () => console.log("listening requests on port:", PORT));

// connecting to db
mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to DB");
});

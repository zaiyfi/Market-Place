const express = require("express");
const router = express.Router();

// importing controller functions
const {
  register,
  login,
  getUsers,
  updateStatus,
  getUser,
  addFavProduct,
} = require("../controllers/authController");

// Setting up Auth Routes
router.post("/register", register);
router.post("/login", login);

// Get All Users Route
router.get("/users", getUsers);
router.get("/user/:user_id", getUser);

// Add product to favourites
router.patch("/favProducts/:user_id/:product_id", addFavProduct);

// Update user status
router.patch("/update/:user_id", updateStatus);

// Exporting
module.exports = router;

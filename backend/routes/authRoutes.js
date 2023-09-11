const express = require("express");
const router = express.Router();

// importing controller functions
const {
  register,
  login,
  getUsers,
  updateStatus,
  getUser,
} = require("../controllers/authController");

// Setting up Auth Routes
router.post("/register", register);
router.post("/login", login);

// Get All Users Route
router.get("/users", getUsers);
router.get("/user/:user_id", getUser);

// Update user status
router.patch("/update/:user_id", updateStatus);

// Exporting
module.exports = router;

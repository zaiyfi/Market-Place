const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Register Controller
const register = async (req, res) => {
  const { name, email, cellNo, password } = req.body;
  let emptyFields = [];
  if (!name) {
    emptyFields.push("name");
  }
  if (!email) {
    emptyFields.push("email");
  }
  if (!password) {
    emptyFields.push("password");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
    await User.register(name, email, cellNo, password);
    res.status(200);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user } = await User.login(email, password);
    // Createing Token
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Getting all Users Data

const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
// Get Specific User
const getUser = async (req, res) => {
  const { user_id } = req.params;

  try {
    const users = await User.findOne({ _id: user_id });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Updating user status
const updateStatus = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await User.findOneAndUpdate({ _id: user_id }, { ...req.body });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "User can't be found!" });
  }
};

// update the user favProducts Array

const addFavProduct = async (req, res) => {
  const { user_id, product_id } = req.params;

  try {
    const product = await Product.findById(product_id);
    if (!product) {
      res.status(404).json("NO SUCH PRODUCT FOUND!");
    } else {
      console.log("product Founded Successfully");
    }
    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { $push: { favProducts: product_id } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error while adding a product to favourites" });
  }
};

module.exports = {
  register,
  login,
  getUsers,
  updateStatus,
  getUser,
  addFavProduct,
};

const User = require("../models/userSchema");
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
    const { user, user_name, user_role } = await User.login(email, password);
    // Createing Token
    const token = createToken(user._id);

    res.status(200).json({ user_name, email, user_role, token });
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

module.exports = { register, login, getUsers, updateStatus, getUser };

const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const cloudinary = require("../cloudinaryConfig");

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
    const user = await User.findOne({ _id: user_id });
    res.status(200).json(user);
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
    console.group("Add FaveProducts started!");
    const product = await Product.findById(product_id);
    if (!product) {
      res.status(404).json("NO SUCH PRODUCT FOUND!");
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

// remove product from favProducts
const removeFavProduct = async (req, res) => {
  const { user_id, product_id } = req.params;

  try {
    const product = await Product.findById(product_id);
    if (!product) {
      res.status(404).json("NO SUCH PRODUCT FOUND!");
    }
    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { $pull: { favProducts: product_id } },
      { new: true }
    );
    console.log(`Removing ProductId ${product_id} from userID ${user_id}`);
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error while adding a product to favourites" });
  }
};

// updating user img

const updateImg = async (req, res) => {
  const image = req.file.path;
  const { user_id } = req.params;

  try {
    // Uploading Image to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "MarketPlace/user",
    });
    const update = await User.findByIdAndUpdate(
      user_id,
      {
        pic: result.secure_url,
        pocPublicId: result.public_id,
      },
      { new: true }
    );
    await res.status(200).json(result.secure_url);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Adding products to users viewedProducts field and adding view to product
const viewedProducts = async (req, res) => {
  const { product_id, userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user.viewedProducts.includes(product_id)) {
      const product = await Product.findByIdAndUpdate(
        product_id,
        { $inc: { views: 1 } }, // Increment views by 1
        { new: true } // Return the updated document
      );
      console.log("product viewed");

      if (!product) {
        res.status(404).json("Product Not Found!");
      }

      user.viewedProducts.push(product_id);
      await user.save();
      res.status(200).json("View Added");
    } else {
      res.status(200).json("Product Already Viewed");
      console.log("product already viewed!");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error!");
  }
};
module.exports = {
  register,
  login,
  getUsers,
  updateStatus,
  getUser,
  addFavProduct,
  viewedProducts,
  removeFavProduct,
  updateImg,
};

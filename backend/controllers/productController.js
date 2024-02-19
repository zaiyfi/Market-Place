const Product = require("../models/productSchema");
const User = require("../models/userSchema");
const cloudinary = require("../cloudinaryConfig");

// Creating the Product
const addProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    used,
    billAvailable,
    warrantyAvailable,
    accessoriesAvailable,
    boxAvailable,
  } = req.body;
  const user = await User.findOne({ _id: req.user._id });
  try {
    const product = await Product.create({
      name,
      description,
      price,
      category,
      used,
      billAvailable,
      warrantyAvailable,
      accessoriesAvailable,
      boxAvailable,
      seller: user._id,
      sellerName: user.name,
      sellerEmail: user.email,
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: "Product is not created!" });
  }
};

// Adding Images of the Product
const uploadImage = async (req, res) => {
  const image = req.file.path;
  const { _id } = req.params;
  try {
    // Uploading Image to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "MarketPlace",
    });
    await Product.findOneAndUpdate(
      { _id },
      { $push: { images: result.secure_url } }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Getting all Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: "No Such Product Exists!" });
  }
};

// Getting Products regarding to user id
const getUserProducts = async (req, res) => {
  const user_id = req.user._id;
  try {
    const products = await Product.find({ seller: user_id }).sort({
      createdAt: -1,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ error: "No Such Product Exists!" });
  }
};

// Updating the Products
const updateProduct = async (req, res) => {
  const { _id } = req.params;
  try {
    const product = await Product.findOneAndUpdate({ _id }, { ...req.body });
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: "No Such Product Exists!" });
  }
};

// Deleting the Products
const deleteProduct = async (req, res) => {
  const { _id } = req.params;
  try {
    const product = await Product.findOneAndDelete({ _id });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Deleting Image of Specific Product
const deleteProductImage = async (req, res) => {
  const { productId, imageIndex } = req.params;
  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ error: "Product not found!" });
    }

    console.log(product.name, product.images);

    if (!product.images || !Array.isArray(product.images)) {
      return res.status(400).json({ error: "Product has no images" });
    }

    if (imageIndex >= 0) {
      // Remove the image from the product's images array
      product.images.splice(imageIndex, 1);

      // Save the updated product
      product.save();
      if (product.save()) {
        res.status(200).json({ message: "Image Deleted Successfully!" });
      }
    } else {
      return res.status(400).json({ error: "Invalid image index" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  addProduct,
  uploadImage,
  getProducts,
  getUserProducts,
  updateProduct,
  deleteProduct,
  deleteProductImage,
};

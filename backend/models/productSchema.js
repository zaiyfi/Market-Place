const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    used: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      default: [],
    },
    billAvailable: {
      type: Boolean,
      default: false,
    },
    warrantyAvailable: {
      type: Boolean,
      default: false,
    },
    accessoriesAvailable: {
      type: Boolean,
      default: false,
    },
    boxAvailable: {
      type: Boolean,
      default: false,
    },
    seller: {
      type: String,
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
    sellerEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

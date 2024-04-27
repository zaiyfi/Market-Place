import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (p) => p._id !== action.payload._id
      );
    },
    createProduct: (state, action) => {
      state.products = [action.payload, ...state.products];
    },
    setProductImage: (state, action) => {
      const { img_url, productId } = action.payload;

      const productIndex = state.products.findIndex((p) => p._id === productId);

      if (productIndex !== -1) {
        // Product found, update its images
        state.products[productIndex].images.push(img_url);
      } else {
        // Product not found, log an error or add a new product
        console.error("Product not found");
        // Add new product logic goes here if needed
      }
    },
    setProductReview: (state, action) => {
      const updatedProduct = action.payload;

      const productIndex = state.products.findIndex(
        (p) => p._id === updatedProduct._id
      );

      if (productIndex !== -1) {
        state.products[productIndex].reviews = updatedProduct.reviews;
      } else {
        console.error("Product not found");
      }
    },
  },
});
export const {
  setProducts,
  deleteProduct,
  createProduct,
  setProductImage,
  setProductReview,
} = productSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

export const userProductSlice = createSlice({
  name: "userProducts",
  initialState: {
    userProducts: [],
  },
  reducers: {
    setUserProducts: (state, action) => {
      state.userProducts = action.payload;
    },
    createUserProduct: (state, action) => {
      state.userProducts = [action.payload, ...state.userProducts];
    },
    deleteUserProduct: (state, action) => {
      state.userProducts = state.userProducts.filter(
        (p) => p._id !== action.payload._id
      );
    },
    updateUserProduct: (state, action) => {
      const { updatedProduct } = action.payload;
      const productIndex = state.userProducts.findIndex(
        (product) => product._id === updatedProduct._id
      );

      if (productIndex >= 0) {
        state.userProducts[productIndex] = updatedProduct; // Update the name of the product with the given _id
      }
    },
  },
});

export const {
  setUserProducts,
  createUserProduct,
  deleteUserProduct,
  updateUserProduct,
} = userProductSlice.actions;

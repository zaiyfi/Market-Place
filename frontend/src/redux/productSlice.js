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
  },
});
export const { setProducts, deleteProduct, createProduct } =
  productSlice.actions;

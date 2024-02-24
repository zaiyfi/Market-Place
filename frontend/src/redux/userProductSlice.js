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
  },
});

export const { setUserProducts, createUserProduct } = userProductSlice.actions;

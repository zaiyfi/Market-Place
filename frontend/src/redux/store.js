import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { loaderSlice } from "./loaderSlice";
import { productSlice } from "./productSlice";
import { allUsersSlice } from "./UsersSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    loader: loaderSlice.reducer,
    products: productSlice.reducer,
    users: allUsersSlice.reducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { loaderSlice } from "./loaderSlice";
import { productSlice } from "./productSlice";
import { allUsersSlice } from "./UsersSlice";
import { userProductSlice } from "./userProductSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    loader: loaderSlice.reducer,
    products: productSlice.reducer,
    userProducts: userProductSlice.reducer,
    users: allUsersSlice.reducer,
  },
});

export default store;

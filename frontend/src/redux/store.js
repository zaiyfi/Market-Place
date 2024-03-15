import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./authSlice";
import { loaderSlice } from "./loaderSlice";
import { productSlice } from "./productSlice";
import { allUsersSlice } from "./UsersSlice";
import { userProductSlice } from "./userProductSlice";
import { notifSlice } from "./notifSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authSlice.reducer,
  loader: loaderSlice.reducer,
  products: productSlice.reducer,
  userProducts: userProductSlice.reducer,
  users: allUsersSlice.reducer,
  notif: notifSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
});

export default store;

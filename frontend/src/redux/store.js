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

const appReducer = combineReducers({
  auth: authSlice.reducer,
  loader: loaderSlice.reducer,
  products: productSlice.reducer,
  userProducts: userProductSlice.reducer,
  users: allUsersSlice.reducer,
  notif: notifSlice.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    // Reset the state to initial state (null or undefined)
    state = undefined;
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});

export default store;

import { createSlice } from "@reduxjs/toolkit";
import { userLocally } from "./userLocal";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.auth = action.payload;
    },
    setFavProducts: (state, action) => {
      if (
        state.auth &&
        state.auth.user &&
        state.auth.user.viewedProducts !== undefined
      ) {
        state.auth = {
          ...state.auth,
          user: {
            ...state.auth.user,
            favProducts: [...state.auth.user.favProducts, action.payload],
          },
        };
      } else {
        state.auth = {
          ...state.auth,
          user: {
            ...state.auth.user,
            favProducts: [action.payload],
          },
        };
      }
    },

    setRemoveFavProducts: (state, action) => {
      const updatedFavProducts = state.auth.user.favProducts.filter(
        (productId) => productId !== action.payload
      );
      state.auth = {
        ...state.auth,
        user: {
          ...state.auth.user,
          favProducts: updatedFavProducts,
        },
      };
    },
    setViewedProducts: (state, action) => {
      const productId = action.payload;

      if (
        state.auth &&
        state.auth.user &&
        state.auth.user.viewedProducts !== undefined
      ) {
        state.auth = {
          ...state.auth,
          user: {
            ...state.auth.user,
            viewedProducts: [...state.auth.user.viewedProducts, productId],
          },
        };
      } else {
        state.auth = {
          ...state.auth,
          user: {
            ...state.auth.user,
            viewedProducts: [productId],
          },
        };
      }
    },
  },
});
export const {
  setUser,
  setViewedProducts,
  setFavProducts,
  setRemoveFavProducts,
} = authSlice.actions;

// Setting user/auth state to the user/auth stored in local storage
export const loadUser = () => async (dispatch) => {
  try {
    // userLocally is a function which gets user from local storage
    const userLocal = await userLocally();
    // dispatching the user state to the user stored locally
    dispatch(setUser(userLocal));
  } catch (error) {
    console.log("User is not Logged in!");
  }
};

export default authSlice.reducer;

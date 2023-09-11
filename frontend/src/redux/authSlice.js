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
  },
});
export const { setUser } = authSlice.actions;

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

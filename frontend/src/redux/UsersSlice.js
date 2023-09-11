import { createSlice } from "@reduxjs/toolkit";

export const allUsersSlice = createSlice({
  name: "users",
  initialState: {
    users: null,
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setAllUsers } = allUsersSlice.actions;

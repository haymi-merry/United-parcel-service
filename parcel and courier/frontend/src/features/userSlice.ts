import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  authenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.authenticated = action.payload.authenticated;
    },
    clearUser: (state) => {
      state.username = "";
      state.authenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

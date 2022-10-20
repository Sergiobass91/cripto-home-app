import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: false,
  },
  reducers: {
    setAuth: (state, action) => {
      state.login = action.payload.login;
    }
  }
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "login",
  initialState: {
    logged: false,
  },
  reducers: {
    setAuth: (state, action) => {
      state.logged = action.payload.logged;
    }
  }
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
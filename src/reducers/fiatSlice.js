import { createSlice } from "@reduxjs/toolkit";

export const fiatSlice = createSlice({
  name: "fiat",
  initialState: {
    currency: "USD",
  },
  reducers: {
    setFiat: (state, action) => {
      state.currency = action.payload.currency;
    }
  }
});

export const { setFiat } = fiatSlice.actions;
export default fiatSlice.reducer;

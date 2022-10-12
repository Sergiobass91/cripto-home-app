import { configureStore } from "@reduxjs/toolkit";
import fiatReducer from "../reducers/fiatSlice";

export default configureStore({
  reducer: {
    fiat: fiatReducer,
  },
});

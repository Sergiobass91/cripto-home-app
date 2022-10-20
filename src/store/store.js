import { configureStore } from "@reduxjs/toolkit";
import fiatReducer from "../reducers/fiatSlice";
import authReducer from "../reducers/authSlice";

export default configureStore({
  reducer: {
    fiat: fiatReducer,
    login: authReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import auth from "./Reducers/authReducer";
import header from "./Reducers/headerReducer";

export const store = configureStore({
  reducer: {
    auth,
    header,
  },
});

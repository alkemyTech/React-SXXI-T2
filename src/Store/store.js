import { configureStore } from "@reduxjs/toolkit"
import auth from "./Reducers/authReducer";

export const store = configureStore({
    reducer: {
        auth,
    }
});
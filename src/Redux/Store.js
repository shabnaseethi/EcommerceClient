import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Cart.js";
import userReducer from "./User.js";
import authReducer from "./AuthSlice.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    auth: authReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import { whatsappSlice } from "./slices";

export const store = configureStore({
  reducer: whatsappSlice.reducer
});

export * from './slices';

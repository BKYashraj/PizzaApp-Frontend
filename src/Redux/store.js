import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/AuthSlice";
import productSliceReducer from "./Slices/ProductSlice";
import cartSliceReducer from "./Slices/CartSlice";
import orderSliceReducer from "./Slices/OrderSlice";
export const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    product: productSliceReducer,
    cart: cartSliceReducer,
    order: orderSliceReducer
  },
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

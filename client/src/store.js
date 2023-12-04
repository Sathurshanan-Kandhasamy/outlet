import { configureStore } from '@reduxjs/toolkit';
import { API } from './slices/api';
import cartSliceReducer from './slices/cart';

const STORE = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
    cart: cartSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default STORE;

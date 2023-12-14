import { configureStore } from '@reduxjs/toolkit';
import { api } from './slices/api';
import cartReducer from './slices/cart';
import authenticationReducer from './slices/authentication';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    cart: cartReducer,
    authentication: authenticationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

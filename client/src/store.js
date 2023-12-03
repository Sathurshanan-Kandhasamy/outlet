import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { API_SLICE } from './slices/api';

const STORE = configureStore({
  reducer: {
    [API_SLICE.reducerPath]: API_SLICE.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API_SLICE.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default STORE;

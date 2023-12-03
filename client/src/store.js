import { configureStore } from '@reduxjs/toolkit';
import { API } from './slices/api';

const STORE = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default STORE;

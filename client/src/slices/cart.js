import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const CART_SLICE = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {},
});

export default CART_SLICE.reducer;

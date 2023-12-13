import { createSlice } from '@reduxjs/toolkit';
import { UPDATE_CART } from '../utilities/cart';

const INITIAL_STATE = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const CART = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    addToCart: (state, action) => {
      const ITEM = action.payload;
      const EXIST_ITEM = state.cartItems.find((item) => item._id === ITEM._id);
      if (EXIST_ITEM) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === EXIST_ITEM._id ? ITEM : item
        );
      } else {
        state.cartItems = [...state.cartItems, ITEM];
      }

      return UPDATE_CART(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      return UPDATE_CART(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      UPDATE_CART(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return UPDATE_CART(state);
    },
  },
});

export const {
  addToCart: ADD_TO_CART,
  removeFromCart: REMOVE_FROM_CART,
  saveShippingAddress: SAVE_SHIPPING_ADDRESS,
  savePaymentMethod: SAVE_PAYMENT_METHOD,
} = CART.actions;
export default CART.reducer;

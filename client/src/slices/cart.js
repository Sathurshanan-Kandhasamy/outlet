import { createSlice } from '@reduxjs/toolkit';
import { UPDATE_CART } from '../utilities/cart';

const INITIAL_STATE = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

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
  },
});

export const { addToCart: ADD_TO_CART } = CART.actions;
export default CART.reducer;

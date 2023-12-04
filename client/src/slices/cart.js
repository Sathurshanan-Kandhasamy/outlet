import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [] };

const ADD_DECIMALS = (number) => {
  return Math.round((number * 100) / 100).toFixed(2);
};

const CART = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    addToCart: (state, action) => {
      const ITEM = action.payload;
      const EXISTS_ITEM = state.cart.find((item) => item._id === ITEM._id);
      if (EXISTS_ITEM) {
        state.cartItems = state.cartItems.map((item) =>
          item._id === EXISTS_ITEM._id ? ITEM : item
        );
      } else {
        state.cartItems = [...state.cartItems];
      }

      // Calculates cart items price.
      state.itemsPrice = ADD_DECIMALS(
        state.cartItems.reduce(
          (accumulator, item) => accumulator + item.price * item.qty,
          0
        )
      );
      // Calculates shipping price. If order is over $100 then free, else $10 shipping.
      state.shippingPrice = ADD_DECIMALS(state.itemsPrice > 100 ? 0 : 10);
      // Calculates tax price, tax is 15%.
      state.taxPrice = ADD_DECIMALS(Number(0.15 * state.itemsPrice).toFixed(2));
      // Calculates total price.
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);
      // Saves the cart in local storage.
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart } = CART.actions;

export default CART.reducer;

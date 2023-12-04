export const ADD_DECIMALS = (number) => {
  return Math.round((number * 100) / 100).toFixed(2);
};

export const UPDATE_CART = (state) => {
  // Calculates cart items price.
  state.itemsPrice = ADD_DECIMALS(
    state.cartItems.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.price * currentItem.qty,
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
  return state;
};

export const addDecimals = (number) => {
  return Math.round((number * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate cart items price.
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.price * currentItem.qty,
      0
    )
  );
  // Calculate shipping price. If order is over $100 then free, else $10 shipping.
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  // Calculate tax price, tax is 15%.
  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));
  // Calculate total price.
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  // Save the cart in local storage.
  localStorage.setItem('cart', JSON.stringify(state));
  return state;
};

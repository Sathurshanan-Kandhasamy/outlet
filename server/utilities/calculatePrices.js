const addDecimals = (number) => {
  return (Math.round(number * 100) / 100).toFixed(2);
};

export const calculatePrices = (orderItems) => {
  const itemsPrice = orderItems.reduce(
    (accumulator, item) => accumulator + (item.price * 100 * item.qty) / 100,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  return {
    itemsPrice: addDecimals(itemsPrice),
    shippingPrice: addDecimals(shippingPrice),
    taxPrice: addDecimals(taxPrice),
    totalPrice: addDecimals(totalPrice),
  };
};

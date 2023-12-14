import ASYNC_HANDLER from '../middleware/asyncHandler.js';
import ORDER from '../models/order.js';

// Description:  Create new order.
// Route:        POST /api/orders
// Access:       Private
export const ADD_ORDER_ITEMS = ASYNC_HANDLER(async (request, response) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = request.body;
  if (orderItems && orderItems.length === 0) {
    response.status(400);
    throw new Error('No order items.');
  } else {
    const order = new ORDER({
      orderItems: orderItems.map((order) => ({
        ...order,
        product: order._id,
        _id: undefined,
      })),
      user: request.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    response.status(201).json(createdOrder);
  }
});

// Description:  Get logged in user orders.
// Route:        GET /api/orders/myorders
// Access:       Private
export const GET_MY_ORDERS = ASYNC_HANDLER(async (request, response) => {
  const orders = await ORDER.find({ user: request.user._id });
  response.status(200).json(orders);
});

// Description:  Get order by id.
// Route:        GET /api/orders/:id
// Access:       Private
export const GET_ORDER_BY_ID = ASYNC_HANDLER(async (request, response) => {
  const order = await ORDER.findById(request.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    response.status(200).json(order);
  } else {
    response.status(404);
    throw new Error('Order not found.');
  }
});

// Description:  Update order to paid.
// Route:        GET /api/orders/:id/pay
// Access:       Private
export const UPDATE_ORDER_TO_PAID = ASYNC_HANDLER(async (request, response) => {
  response.send('Update order to paid.');
});

// Description:  Update order to delivered.
// Route:        GET /api/orders/:id/delivery
// Access:       Private/Admin
export const UPDATE_ORDER_TO_DELIVERED = ASYNC_HANDLER(
  async (request, response) => {
    response.send('Update order to delivered.');
  }
);

// Description:  Get all orders.
// Route:        POST /api/orders
// Access:       Private/Admin
export const GET_ORDERS = ASYNC_HANDLER(async (request, response) => {
  response.send('Get all orders.');
});

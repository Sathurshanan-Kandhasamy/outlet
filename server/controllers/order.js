import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/order.js';

// Description:  Create new order.
// Route:        POST /api/orders
// Access:       Private
export const addOrderItems = asyncHandler(async (request, response) => {
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
    const order = new Order({
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
export const getMyOrders = asyncHandler(async (request, response) => {
  const orders = await Order.find({ user: request.user._id });
  response.status(200).json(orders);
});

// Description:  Get order by id.
// Route:        GET /api/orders/:id
// Access:       Private
export const getOrderById = asyncHandler(async (request, response) => {
  const order = await Order.findById(request.params.id).populate(
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
// Route:        PUT /api/orders/:id/pay
// Access:       Private
export const updateOrderToPaid = asyncHandler(async (request, response) => {
  const order = await Order.findById(request.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: request.body.id,
      status: request.body.status,
      update_time: request.body.update_time,
      email_address: request.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    response.status(200).json(updatedOrder);
  } else {
    response.status(404);
    throw new Error('Order not found.');
  }
});

// Description:  Update order to delivered.
// Route:        PUT /api/orders/:id/delivery
// Access:       Private/Admin
export const updateOrderToDelivered = asyncHandler(
  async (request, response) => {
    const order = await Order.findById(request.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      const updatedOrder = await order.save();
      response.status(200).json(updatedOrder);
    } else {
      response.status(404);
      throw new Error('Order not found.');
    }
  }
);

// Description:  Get all orders.
// Route:        POST /api/orders
// Access:       Private/Admin
export const getOrders = asyncHandler(async (request, response) => {
  const orders = await Order.find({}).populate('user', 'id name');
  response.status(200).json(orders);
});

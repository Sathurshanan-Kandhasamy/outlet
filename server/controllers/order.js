import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/order.js';
import Product from '../models/product.js';
import { calculatePrices } from '../utilities/calculatePrices.js';
import {
  verifyPayPalPayment,
  checkIfNewTransaction,
} from '../utilities/paypal.js';

// Description:  Create a new order.
// Route:        POST /api/orders
// Access:       Private
export const addOrderItems = asyncHandler(async (request, response) => {
  const { orderItems, shippingAddress, paymentMethod } = request.body;
  if (orderItems && orderItems.length === 0) {
    response.status(400);
    throw new Error('No order items.');
  } else {
    const itemsFromDatabase = await Product.find({
      _id: { $in: orderItems.map((item) => item._id) },
    });
    const databaseOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDatabase = itemsFromDatabase.find(
        (itemsFromDatabase) =>
          itemsFromDatabase._id.toString() === itemFromClient._id
      );
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDatabase.price,
        _id: undefined,
      };
    });
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calculatePrices(databaseOrderItems);
    const order = new Order({
      orderItems: databaseOrderItems,
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

// Description:  Update an order to paid.
// Route:        PUT /api/orders/:id/pay
// Access:       Private
export const updateOrderToPaid = asyncHandler(async (request, response) => {
  const { verified, value } = await verifyPayPalPayment(request.body.id);
  if (!verified) throw new Error('Payment not verified.');

  const isNewTransaction = await checkIfNewTransaction(Order, request.body.id);
  if (!isNewTransaction) throw new Error('Transaction has been used before.');

  const order = await Order.findById(request.params.id);
  if (order) {
    const paidCorrectAmount = order.totalPrice.toString() === value;
    if (!paidCorrectAmount) throw new Error('Incorrect amount paid.');
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

// Description:  Update an order to delivered.
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

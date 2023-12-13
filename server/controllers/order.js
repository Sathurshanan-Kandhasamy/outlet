import ASYNC_HANDLER from '../middleware/asyncHandler.js';
import ORDER from '../models/order.js';

// Description:  Create new order.
// Route:        POST /api/orders
// Access:       Private
export const ADD_ORDER_ITEMS = ASYNC_HANDLER(async (request, response) => {
  response.send('Add order items.');
});

// Description:  Get logged in user orders.
// Route:        GET /api/orders/myorders
// Access:       Private
export const GET_MY_ORDERS = ASYNC_HANDLER(async (request, response) => {
  response.send('Get my orders.');
});

// Description:  Get order by id.
// Route:        GET /api/orders/:id
// Access:       Private
export const GET_ORDER_BY_ID = ASYNC_HANDLER(async (request, response) => {
  response.send('Get order by id.');
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

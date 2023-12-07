import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import USER from '../models/user.js';

// Protect middleware.
export const PROTECT = asyncHandler(async (request, response, next) => {
  // Reads the jwt from the cookie.
  let token = request.cookies.jwt;
  if (token) {
    try {
      const DECODED = jwt.verify(token, process.env.JWT_SECRET);
      request.user = await USER.findById(DECODED.userId).select('-password');
      next();
    } catch (error) {
      console.log(error);
      response.status(401);
      throw new Error('Not authorized, token failed.');
    }
  } else {
    response.status(401);
    throw new Error('Not authorized, no token.');
  }
});

// Admin middleware.
export const ADMIN = (request, response, next) => {
  if (request.user && request.user.isAdmin) {
    next();
  } else {
    response.status(401);
    throw new Error('Not authorized as admin.');
  }
};

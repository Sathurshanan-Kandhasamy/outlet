import ASYNC_HANDLER from '../middleware/asyncHandler.js';
import USER from '../models/user.js';
import jwt from 'jsonwebtoken';

// Description:  Logins user and gets token.
// Route:        POST /api/users/login
// Access:       Public
export const LOGIN_USER = ASYNC_HANDLER(async (request, response) => {
  const { email: EMAIL, password: PASSWORD } = request.body;
  const QUERY_RESULT = await USER.findOne({ email: EMAIL });
  if (QUERY_RESULT && (await QUERY_RESULT.matchPassword(PASSWORD))) {
    const TOKEN = jwt.sign(
      { userId: QUERY_RESULT._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      }
    );
    // Sets JWT as HTTP-Only cookie.
    response.cookie('jwt', TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // Expires after 30 days.
    });
    response.json({
      _id: QUERY_RESULT._id,
      name: QUERY_RESULT.name,
      email: QUERY_RESULT.email,
      isAdmin: QUERY_RESULT.isAdmin,
    });
  } else {
    response.status(401);
    throw new Error('Invalid email or password.');
  }
});

// Description:  Registers user.
// Route:        POST /api/users
// Access:       Public
export const REGISTER_USER = ASYNC_HANDLER(async (request, response) => {
  response.send('Register user.');
});

// Description:  Logouts user and clears cookie.
// Route:        POST /api/users/logout
// Access:       Private
export const LOGOUT_USER = ASYNC_HANDLER(async (request, response) => {
  response.send('Logout user.');
});

// Description:  Gets a user profile.
// Route:        POST /api/users/profile
// Access:       Private
export const GET_USER_PROFILE = ASYNC_HANDLER(async (request, response) => {
  response.send('Get user profile.');
});

// Description:  Updates user profile.
// Route:        PUT /api/users/profile
// Access:       Private
export const UPDATE_USER_PROFILE = ASYNC_HANDLER(async (request, response) => {
  response.send('Update user profile.');
});

// Description:  Gets all the users.
// Route:        GET /api/users
// Access:       Private/Admin
export const GET_USERS = ASYNC_HANDLER(async (request, response) => {
  response.send('Get all the users.');
});

// Description:  Gets user by id.
// Route:        GET /api/users/:id
// Access:       Private/Admin
export const GET_USER_BY_ID = ASYNC_HANDLER(async (request, response) => {
  response.send('Get user by id.');
});

// Description:  Deletes an user.
// Route:        DELETE /api/users/:id
// Access:       Private/Admin
export const DELETE_USER = ASYNC_HANDLER(async (request, response) => {
  response.send('Delete user.');
});

// Description:  Updates an user.
// Route:        PUT /api/users/:id
// Access:       Private/Admin
export const UPDATE_USER = ASYNC_HANDLER(async (request, response) => {
  response.send('Update user.');
});

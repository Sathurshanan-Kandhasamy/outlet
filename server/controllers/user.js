import ASYNC_HANDLER from '../middleware/asyncHandler.js';
import USER from '../models/user.js';

// Description:  Logins user and gets token.
// Route:        POST /api/users/login
// Access:       Public
const LOGIN_USER = ASYNC_HANDLER(async (request, response) => {
  response.send('Login user.');
});

// Description:  Registers user.
// Route:        POST /api/users
// Access:       Public
const REGISTER_USER = ASYNC_HANDLER(async (request, response) => {
  response.send('Register user.');
});

// Description:  Logouts user and clears cookie.
// Route:        POST /api/users/logout
// Access:       Private
const LOGOUT_USER = ASYNC_HANDLER(async (request, response) => {
  response.send('Logout user.');
});

// Description:  Queries user profile.
// Route:        POST /api/users/profile
// Access:       Private
const QUERY_USER_PROFILE = ASYNC_HANDLER(async (request, response) => {
  response.send('Query user profile.');
});

// Description:  Updates user profile.
// Route:        PUT /api/users/profile
// Access:       Private
const UPDATE_USER_PROFILE = ASYNC_HANDLER(async (request, response) => {
  response.send('Update user profile.');
});

// Description:  Queries all the users.
// Route:        GET /api/users
// Access:       Private/Admin
const QUERY_USERS = ASYNC_HANDLER(async (request, response) => {
  response.send('Query all the users.');
});

// Description:  Queries user by id.
// Route:        GET /api/users/:id
// Access:       Private/Admin
const QUERY_USER_BY_ID = ASYNC_HANDLER(async (request, response) => {
  response.send('Query user by id.');
});

// Description:  Deletes user.
// Route:        DELETE /api/users/:id
// Access:       Private/Admin
const DELETE_USER = ASYNC_HANDLER(async (request, response) => {
  response.send('Delete user.');
});

// Description:  Updates user.
// Route:        PUT /api/users/:id
// Access:       Private/Admin
const UPDATE_USER = ASYNC_HANDLER(async (request, response) => {
  response.send('Update user.');
});

export {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  QUERY_USER_PROFILE,
  UPDATE_USER_PROFILE,
  QUERY_USERS,
  DELETE_USER,
  QUERY_USER_BY_ID,
  UPDATE_USER,
};

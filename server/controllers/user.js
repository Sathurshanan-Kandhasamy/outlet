import ASYNC_HANDLER from '../middleware/asyncHandler.js';
import USER from '../models/user.js';
import generateToken from '../utilities/generateToken.js';

// Description:  Logins user and gets token.
// Route:        POST /api/users/login
// Access:       Public
export const LOGIN_USER = ASYNC_HANDLER(async (request, response) => {
  const { email: EMAIL, password: PASSWORD } = request.body;
  const QUERY_RESULT = await USER.findOne({ email: EMAIL });
  if (QUERY_RESULT && (await QUERY_RESULT.matchPassword(PASSWORD))) {
    generateToken(response, QUERY_RESULT._id);
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
  const { name: NAME, email: EMAIL, password: PASSWORD } = request.body;

  const USER_EXISTS = await USER.findOne({ email: EMAIL });
  if (USER_EXISTS) {
    response.status(400);
    throw new Error('User already exists.');
  }

  const NEW_USER = await USER.create({
    name: NAME,
    email: EMAIL,
    password: PASSWORD,
  });
  if (NEW_USER) {
    generateToken(response, NEW_USER._id);
    response.status(201).json({
      _id: NEW_USER._id,
      name: NEW_USER.name,
      email: NEW_USER.email,
      isAdmin: NEW_USER.isAdmin,
    });
  } else {
    response.status(400);
    throw new Error('Invalid user data.');
  }
});

// Description:  Logouts user and clears cookie.
// Route:        POST /api/users/logout
// Access:       Private
export const LOGOUT_USER = ASYNC_HANDLER(async (request, response) => {
  response.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  response.status(200).json({ message: 'Logged out successfully.' });
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

import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/user.js';
import generateToken from '../utilities/generateToken.js';

// Description:  Logins user and gets token.
// Route:        POST /api/users/login
// Access:       Public
export const loginUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(response, user._id);
    response.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    response.status(401);
    throw new Error('Invalid email or password.');
  }
});

// Description:  Registers user.
// Route:        POST /api/users
// Access:       Public
export const registerUser = asyncHandler(async (request, response) => {
  const { name, email, password } = request.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    response.status(400);
    throw new Error('User already exists.');
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });
  if (newUser) {
    generateToken(response, newUser._id);
    response.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } else {
    response.status(400);
    throw new Error('Invalid user data.');
  }
});

// Description:  Logouts user and clears cookie.
// Route:        POST /api/users/logout
// Access:       Private
export const logoutUser = asyncHandler(async (request, response) => {
  response.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  response.status(200).json({ message: 'Logged out successfully.' });
});

// Description:  Gets a user profile.
// Route:        POST /api/users/profile
// Access:       Private
export const getUserProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user._id);
  if (user) {
    response.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    response.status(404);
    throw new Error('User not found.');
  }
});

// Description:  Updates user profile.
// Route:        PUT /api/users/profile
// Access:       Private
export const updateUserProfile = asyncHandler(async (request, response) => {
  const user = await User.findById(request.user._id);
  if (user) {
    user.name = request.body.name || QUERY_RESULT.name;
    user.email = request.body.email || QUERY_RESULT.email;
    if (request.body.password) {
      user.password = request.body.password;
    }
    const updatedUser = await user.save();
    response.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    response.status(404);
    throw new Error('User not found.');
  }
});

// Description:  Gets all the users.
// Route:        GET /api/users
// Access:       Private/Admin
export const getUsers = asyncHandler(async (request, response) => {
  response.send('Get all the users.');
});

// Description:  Gets user by id.
// Route:        GET /api/users/:id
// Access:       Private/Admin
export const getUserById = asyncHandler(async (request, response) => {
  response.send('Get user by id.');
});

// Description:  Deletes an user.
// Route:        DELETE /api/users/:id
// Access:       Private/Admin
export const deleteUser = asyncHandler(async (request, response) => {
  response.send('Delete user.');
});

// Description:  Updates an user.
// Route:        PUT /api/users/:id
// Access:       Private/Admin
export const updateUser = asyncHandler(async (request, response) => {
  response.send('Update user.');
});

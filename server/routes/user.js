import express from 'express';
const ROUTER = express.Router();
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  GET_USER_PROFILE,
  UPDATE_USER_PROFILE,
  GET_USERS,
  DELETE_USER,
  GET_USER_BY_ID,
  UPDATE_USER,
} from '../controllers/user.js';
import { PROTECT, ADMIN } from '../middleware/authentication.js';

ROUTER.route('/').get(PROTECT, ADMIN, GET_USERS).post(REGISTER_USER);
ROUTER.post('/logout', LOGOUT_USER);
ROUTER.post('/login', LOGIN_USER);
ROUTER.route('/profile')
  .get(PROTECT, GET_USER_PROFILE)
  .put(PROTECT, UPDATE_USER_PROFILE);
ROUTER.route('/:id')
  .get(PROTECT, ADMIN, GET_USER_BY_ID)
  .put(PROTECT, ADMIN, UPDATE_USER)
  .delete(PROTECT, ADMIN, DELETE_USER);

export default ROUTER;

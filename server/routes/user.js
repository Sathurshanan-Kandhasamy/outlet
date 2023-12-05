import express from 'express';
const ROUTER = express.Router();
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  QUERY_USER_PROFILE,
  UPDATE_USER_PROFILE,
  QUERY_USERS,
  DELETE_USER,
  QUERY_USER_BY_ID,
  UPDATE_USER,
} from '../controllers/user.js';

ROUTER.route('/').get(QUERY_USERS).post(REGISTER_USER);
ROUTER.post('/logout', LOGOUT_USER);
ROUTER.post('/login', LOGIN_USER);
ROUTER.route('/profile').get(QUERY_USER_PROFILE).put(UPDATE_USER_PROFILE);
ROUTER.route('/:id').get(QUERY_USER_BY_ID).put(UPDATE_USER).delete(DELETE_USER);

export default ROUTER;

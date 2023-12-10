import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const AUTHENTICATION = createSlice({
  name: 'authentication',
  initialState: INITIAL_STATE,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials: SET_CREDENTIALS, logout: LOGOUT } =
  AUTHENTICATION.actions;
export default AUTHENTICATION.reducer;

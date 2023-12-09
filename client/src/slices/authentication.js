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
  },
});

export const { setCredentials: SET_CREDENTIALS } = AUTHENTICATION.actions;
export default AUTHENTICATION.reducer;

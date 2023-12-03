import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { BASE_URL } from '../constants';

const BASE_QUERY = fetchBaseQuery({
  baseUrl: BASE_URL,
});

export const API_SLICE = createApi({
  BASE_QUERY,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
});

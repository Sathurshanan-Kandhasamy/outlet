import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const BASE_QUERY = fetchBaseQuery({
  baseUrl: BASE_URL,
});

export const API = createApi({
  baseQuery: BASE_QUERY,
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}),
});

import { PRODUCTS_URL } from '../constants';
import { API } from './api';

const PRODUCTS_API = API.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery } = PRODUCTS_API;

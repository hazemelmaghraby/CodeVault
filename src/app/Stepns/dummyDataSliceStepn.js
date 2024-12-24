import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from './../../constants/database/firebase'; // Import your Firebase DB instance
import { collection, getDocs } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

// Create the products API with fakeBaseQuery
export const dummyDataApi = createApi({
    reducerPath: 'dummyDataApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
    endpoints: (builder) => ({
        // Get all products (Reading)
        getAllProducts: builder.query({
            query: () => '/products',
        }),
    }),
});


export const { useGetAllProductsQuery } = dummyDataApi;

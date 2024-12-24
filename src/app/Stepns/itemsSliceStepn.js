import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { db } from './../../constants/database/firebase'; // Import your Firebase DB instance
import { collection, getDocs } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

// Create the products API with fakeBaseQuery
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        // Get all products (Reading)
        getAllProducts: builder.query({
            queryFn: async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, 'products'));
                    const products = [];

                    // Iterate through the Firestore snapshot and collect the data
                    querySnapshot.forEach((doc) => {
                        products.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });

                    // Return data in the format expected by RTK Query
                    return { data: products };
                } catch (error) {
                    // If an error occurs, return the error message
                    return { error: { message: 'Error fetching products' } };
                }
            },

        }),
    }),
});

export const { useGetAllProductsQuery } = productsApi;

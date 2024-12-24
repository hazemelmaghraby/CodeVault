import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './Slices/itemsSlice'; // Path to your itemsSlice file
import cartReducer from './Slices/cartSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { dummyDataApi } from './Slices/dummyApiDataSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [dummyDataApi.reducerPath]: dummyDataApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore certain paths of the state that include the Timestamp
                ignoredActions: [
                    'productsApi/executeQuery/fulfilled',
                    'dummyDataApi/executeQuery/fulfilled'
                ],
                ignoredPaths: [
                    'productsApi.queries.getAllProducts.data.timestamp',
                    'dummyDataApi.queries.getAllProducts.data.timestamp'
                ],
            },
        }).concat(productsApi.middleware, dummyDataApi.middleware),
});

export default store;


// middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//         serializableCheck: {
//             // Ignore certain paths of the state that include the Timestamp
//             ignoredActions: ['productsApi/executeQuery/fulfilled'],
//             ignoredPaths: ['productsApi.queries.getAllProducts.data.timestamp'],
//         },
//     }).concat(productsApi.middleware),

// middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//         serializableCheck: {
//             // Ignore certain paths of the state that include the Timestamp
//             ignoredActions: ['dummyDataApi/executeQuery/fulfilled'],
//             ignoredPaths: ['dummyDataApi.queries.getAllProducts.data.timestamp'],
//         },
//     }).concat(dummyDataApi.middleware),
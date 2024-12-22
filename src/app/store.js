import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './Slices/itemsSlice'; // Path to your itemsSlice file
import cartReducer from './Slices/cartSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore certain paths of the state that include the Timestamp
                ignoredActions: ['productsApi/executeQuery/fulfilled'],
                ignoredPaths: ['productsApi.queries.getAllProducts.data.timestamp'],
            },
        }).concat(productsApi.middleware),
});

export default store;

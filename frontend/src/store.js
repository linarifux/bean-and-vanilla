import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice'; // Import the base API slice
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    // 1. Add the generated reducer from the apiSlice
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  // 2. Add the api middleware to enable caching, invalidation, and polling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  
  // 3. Enable DevTools for easier debugging during development
  devTools: true,
});

export default store;
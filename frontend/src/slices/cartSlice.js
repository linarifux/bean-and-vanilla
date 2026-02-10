import { createSlice } from '@reduxjs/toolkit';

// --- HELPER FUNCTION ---
// Centralizes all price calculations to ensure consistency across reducers
const updateCart = (state) => {
  // 1. Calculate Items Price (Subtotal)
  const itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  state.itemsPrice = Number(itemsPrice.toFixed(2));

  // 2. Calculate Shipping Price
  // Policy: Free shipping if subtotal > $150, otherwise $10
  state.shippingPrice = state.itemsPrice > 150 ? 0 : 10;

  // 3. Calculate Tax Price (e.g., 8%)
  state.taxPrice = Number((0.08 * state.itemsPrice).toFixed(2));

  // 4. Calculate Total Price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // 5. Persist to Local Storage
  localStorage.setItem('cart', JSON.stringify(state));
  
  return state;
};

// --- INITIAL STATE ---
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // If item exists, update it (e.g., quantity change)
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // If item doesn't exist, push it
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },

    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },

    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  saveShippingAddress, 
  savePaymentMethod, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
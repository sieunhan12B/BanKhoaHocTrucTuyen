import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.maKhoaHoc === action.payload.maKhoaHoc
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { maKhoaHoc, quantity } = action.payload;
      const item = state.cart.find((item) => item.maKhoaHoc === maKhoaHoc);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      console.log(action.payload);
      state.cart = state.cart.filter(
        (item) => item.maKhoaHoc !== action.payload.maKhoaHoc
      );
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;

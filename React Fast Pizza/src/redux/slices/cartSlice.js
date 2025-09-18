import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },

    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    increaseQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);

      if (item) {
        item.quanity++;
        item.totalPrice = item.quanity * item.unitPrice;
      }
    },

    decreaseQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);

      if (item) {
        item.quanity--;
        item.totalPrice = item.quanity * item.unitPrice;
      }
    },
  },
});

export const { addItem } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

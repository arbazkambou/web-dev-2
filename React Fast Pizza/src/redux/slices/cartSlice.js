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
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },

    decreaseQuantity(state, action) {
      const item = state.cart.find((item) => item.id === action.payload);

      if (item.quantity === 1) {
        cartSlice.caseReducers.deleteItem(state, action);
        // state.cart = state.cart.filter((item) => item.id !== action.payload);
        return;
      }

      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },

    clearCart(state) {
      state.cart.length = [];
    },
  },
});

export const {
  addItem,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  clearCart,
} = cartSlice.actions;

// export const getQuantityById=(id)=>

export const cartReducer = cartSlice.reducer;

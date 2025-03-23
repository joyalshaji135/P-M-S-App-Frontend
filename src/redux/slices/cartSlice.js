// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//     totalPrice: 0,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     resetCart: (state) => {
//       state.items = [];
//       state.totalPrice = 0;
//       state.loading = false;
//       state.error = null;
//       try {
//         localStorage.removeItem("cartItems"); // Clear cart data from local storage
//       } catch (error) {
//         console.error("Error clearing cart data from local storage:", error);
//       }
//     },
//     setCartItems: (state, action) => {
//       state.items = action.payload.items;
//       state.totalPrice = action.payload.totalPrice;
//     },
//   },
// });

// export const { resetCart, setCartItems } = cartSlice.actions;
// export default cartSlice.reducer;

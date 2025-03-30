import { createSlice } from "@reduxjs/toolkit";
import { createAuthSlice } from "./authSlice";

const { reducer, actions } = createAuthSlice("admin");

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    ...reducer(undefined, { type: "" }),
    currentUser: JSON.parse(localStorage.getItem("admin")), // Load admin user data from localStorage
  },
  reducers: {
    ...actions,
    updateAdminProfile: (state, action) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
        try {
          localStorage.setItem("admin", JSON.stringify(state.currentUser));
        } catch (error) {
          console.error("Error updating admin in local storage:", error);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.loginUser.pending, (state) => {
        console.log("Login pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(actions.loginUser.fulfilled, (state, action) => {
        const { customer, token } = action.payload;
        console.log("Login successful:", customer, token);
        state.currentUser = customer;
        state.token = token;
        state.loading = false;
        state.error = null;
        try {
          localStorage.setItem("admin", JSON.stringify(customer));
        } catch (error) {
          console.error("Error saving admin data to local storage:", error);
        }
      })
      .addCase(actions.loginUser.rejected, (state, action) => {
        console.log("Login failed:", action.payload);
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const {
  signOutSuccess,
  setLoading,
  clearError,
  updateAdminProfile,
} = adminSlice.actions;
export const loginUser = actions.loginUser;
export default adminSlice.reducer;

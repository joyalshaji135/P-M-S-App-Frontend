import { createSlice } from "@reduxjs/toolkit";
import { createAuthSlice } from "./authSlice";

const authSlice = createAuthSlice("admin");

const adminSlice = createSlice({
  name: "admin",
  initialState: authSlice.reducer(undefined, { type: "" }), // Get initial state from authSlice
  reducers: {
    updateAdminProfile: (state, action) => {
      if (state.currentUser) {
        state.currentUser = { 
          ...state.currentUser, 
          ...action.payload 
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authSlice.actions.signOutSuccess, (state) => {
        state.currentUser = null;
        state.token = null;
      })
      .addCase(authSlice.actions.setLoading, (state, action) => {
        state.loading = action.payload;
      })
      .addCase(authSlice.actions.clearError, (state) => {
        state.error = null;
      })
      .addCase(authSlice.actions.loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
      });
  },
});

// Export necessary actions
export const { updateAdminProfile } = adminSlice.actions;
export const { signOutSuccess, setLoading, clearError, loginUser } = authSlice.actions;

export default adminSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { createAuthSlice } from "./authSlice";

// Create base auth slice for team-managers
const authSlice = createAuthSlice("team-managers");

const teamManagersSlice = createSlice({
  name: "team-managers",
  initialState: authSlice.reducer(undefined, { type: "" }), // Correctly retrieve initial state
  reducers: {
    // Team manager-specific reducers
    updateTeam: (state, action) => {
      if (state.currentUser) {
        state.currentUser.team = action.payload;
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

// Export team-manager-specific actions
export const { updateTeam } = teamManagersSlice.actions;
export const { signOutSuccess, setLoading, clearError, loginUser } = authSlice.actions; // Re-export auth actions

export default teamManagersSlice.reducer;

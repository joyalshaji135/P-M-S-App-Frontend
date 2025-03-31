import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAuthSlice } from "./authSlice";

// Create base auth slice for team-members
const authSlice = createAuthSlice("team-members");

// Define updateTasks as an async thunk (automatically exportable)
export const updateTasks = createAsyncThunk(
  "team-members/updateTasks",
  async (tasks, { rejectWithValue }) => {
    try {
      return tasks;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const teamMembersSlice = createSlice({
  name: "team-members",
  initialState: {
    ...authSlice.reducer(undefined, { type: "" }), // Correctly retrieve initial state
    tasksLoading: false,
    tasksError: null,
  },
  reducers: {}, 
  extraReducers: (builder) => {
    // Auth actions
    builder
      .addCase(authSlice.actions.loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authSlice.actions.loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(authSlice.actions.loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(authSlice.actions.signOutSuccess, (state) => {
        state.currentUser = null;
        state.token = null;
      })
      .addCase(authSlice.actions.setLoading, (state, action) => {
        state.loading = action.payload;
      })
      .addCase(authSlice.actions.clearError, (state) => {
        state.error = null;
      });

    // Task actions
    builder
      .addCase(updateTasks.pending, (state) => {
        state.tasksLoading = true;
        state.tasksError = null;
      })
      .addCase(updateTasks.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.tasks = action.payload;
        }
        state.tasksLoading = false;
      })
      .addCase(updateTasks.rejected, (state, action) => {
        state.tasksLoading = false;
        state.tasksError = action.payload;
      });
  },
});

// Export only specific actions
export const { signOutSuccess, setLoading, clearError } = authSlice.actions;
export const loginUser = authSlice.actions.loginUser;

export default teamMembersSlice.reducer;

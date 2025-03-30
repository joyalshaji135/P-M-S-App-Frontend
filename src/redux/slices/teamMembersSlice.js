// slices/teamMembersSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createAuthSlice } from './authSlice';

const { reducer, actions } = createAuthSlice('team-members');

const teamMembersSlice = createSlice({
  name: 'team-members',
  initialState: reducer(undefined, { type: '' }),
  reducers: {
    ...actions,
    // Team member-specific reducers
    updateTasks: (state, action) => {
      if (state.currentUser) {
        state.currentUser.tasks = action.payload;
        try {
          localStorage.setItem('team-members', JSON.stringify(state.currentUser));
        } catch (error) {
          console.error("Error updating team member in local storage:", error);
        }
      }
    },
  },
});

export const { 
  signOutSuccess, 
  setLoading, 
  clearError, 
  updateTasks 
} = teamMembersSlice.actions;
export const loginUser = actions.loginUser;
export default teamMembersSlice.reducer;
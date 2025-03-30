// slices/teamManagersSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createAuthSlice } from './authSlice';

const { reducer, actions } = createAuthSlice('team-managers');

const teamManagersSlice = createSlice({
  name: 'team-managers',
  initialState: reducer(undefined, { type: '' }),
  reducers: {
    ...actions,
    // Team manager-specific reducers
    updateTeam: (state, action) => {
      if (state.currentUser) {
        state.currentUser.team = action.payload;
        try {
          localStorage.setItem('team-managers', JSON.stringify(state.currentUser));
        } catch (error) {
          console.error("Error updating team manager in local storage:", error);
        }
      }
    },
  },
});

export const { 
  signOutSuccess, 
  setLoading, 
  clearError, 
  updateTeam 
} = teamManagersSlice.actions;
export const loginUser = actions.loginUser;
export default teamManagersSlice.reducer;
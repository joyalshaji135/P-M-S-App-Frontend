// slices/companyOwnersSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createAuthSlice } from './authSlice';

const { reducer, actions } = createAuthSlice('company-owners');

const companyOwnersSlice = createSlice({
  name: 'company-owners',
  initialState: reducer(undefined, { type: '' }),
  reducers: {
    ...actions,
    // Company owner-specific reducers
    updateCompanyDetails: (state, action) => {
      if (state.currentUser) {
        state.currentUser.company = { 
          ...state.currentUser.company, 
          ...action.payload 
        };
        try {
          localStorage.setItem('company-owners', JSON.stringify(state.currentUser));
        } catch (error) {
          console.error("Error updating company owner in local storage:", error);
        }
      }
    },
  },
});

export const { 
  signOutSuccess, 
  setLoading, 
  clearError, 
  updateCompanyDetails 
} = companyOwnersSlice.actions;
export const loginUser = actions.loginUser;
export default companyOwnersSlice.reducer;
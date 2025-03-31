import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAuthSlice } from "./authSlice";

// Create base auth slice for company-owners
const authSlice = createAuthSlice("company-owners");

// Create async thunk for updating company details
export const updateCompanyDetails = createAsyncThunk(
  "company-owners/updateCompanyDetails",
  async (companyData, { rejectWithValue }) => {
    try {
      return companyData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const companyOwnersSlice = createSlice({
  name: "company-owners",
  initialState: {
    ...authSlice.reducer(undefined, { type: "" }), // Correctly retrieve initial state
    companyUpdateLoading: false,
    companyUpdateError: null,
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

    // Company update actions
    builder
      .addCase(updateCompanyDetails.pending, (state) => {
        state.companyUpdateLoading = true;
        state.companyUpdateError = null;
      })
      .addCase(updateCompanyDetails.fulfilled, (state, action) => {
        if (state.currentUser) {
          state.currentUser.company = { 
            ...state.currentUser.company,
            ...action.payload
          };
        }
        state.companyUpdateLoading = false;
      })
      .addCase(updateCompanyDetails.rejected, (state, action) => {
        state.companyUpdateLoading = false;
        state.companyUpdateError = action.payload;
      });
  },
});

// Export only specific actions
export const { signOutSuccess, setLoading, clearError } = authSlice.actions;
export const loginUser = authSlice.actions.loginUser;

export default companyOwnersSlice.reducer;

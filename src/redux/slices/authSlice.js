import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../api/admin-dashboard-api/login-api/LoginApi";

export const createAuthSlice = (role) => {
  // Initialize state from sessionStorage (secure storage)
  const initialState = {
    currentUser: JSON.parse(sessionStorage.getItem(`${role}_User`)) || null,
    token: sessionStorage.getItem(`${role}_Token`) || null,
    error: null,
    loading: false,
    role,
  };

  const loginUser = createAsyncThunk(
    `${role}/login`,
    async ({ email, password }, { rejectWithValue }) => {
      try {
        const response = await loginApi({ email, password, role });
        return response;
      } catch (error) {
        return rejectWithValue(error.message || "Login failed");
      }
    }
  );

  const slice = createSlice({
    name: role,
    initialState,
    reducers: {
      signOutSuccess: () => {
        sessionStorage.removeItem(`${role}_Token`);
        sessionStorage.removeItem(`${role}_User`);
        return { ...initialState, role }; 
      },
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
      clearError: (state) => {
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          const { user, token } = action.payload;
          state.currentUser = user;
          state.token = token;
          state.error = null;
          state.loading = false;

          // Persist successful login session
          sessionStorage.setItem(`${role}_Token`, token);
          sessionStorage.setItem(`${role}_User`, JSON.stringify(user));
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Login failed";
        });
    },
  });

  return {
    reducer: slice.reducer,
    actions: { ...slice.actions, loginUser },
  };
};

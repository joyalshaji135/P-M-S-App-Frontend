import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../api/admin-dashboard-api/login-api/LoginApi";

export const createAuthSlice = (role) => {
  const loadUserFromLocalStorage = () => {
    try {
      const storedInfo = localStorage.getItem(role);
      return storedInfo ? JSON.parse(storedInfo) : null;
    } catch (error) {
      console.error(`Error parsing ${role} info from local storage:`, error);
      return null;
    }
  };

  const initialState = {
    currentUser: loadUserFromLocalStorage(),
    token: null,
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
        return rejectWithValue(error.response?.data?.message || "Login failed");
      }
    }
  );

  const slice = createSlice({
    name: role,
    initialState,
    reducers: {
      signOutSuccess: (state) => {
        state.currentUser = null;
        state.token = null;
        state.error = null;
        state.loading = false;
        try {
          localStorage.removeItem(role);
        } catch (error) {
          console.error(`Error removing ${role} info from local storage:`, error);
        }
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
          try {
            localStorage.setItem(role, JSON.stringify({ ...user, token }));
          } catch (error) {
            console.error(`Error saving ${role} info to local storage:`, error);
          }
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

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginCustomer } from "../../api/websiteApiSection/customerApi";

// Async thunk for customer login
export const Login_Customer = createAsyncThunk(
  "customer/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginCustomer(email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
// Selectors
export const selectCurrentItsMeCustomer = (state) =>
  state.customer.currentItsMeCustomer;
export const selectCustomerToken = (state) => state.customer.token;
export const selectCustomerError = (state) => state.customer.error;
export const selectCustomerLoading = (state) => state.customer.loading;

// Utility function to handle localStorage
const loadCustomerFromLocalStorage = () => {
  try {
    const storedInfo = localStorage.getItem("itsme_customer");
    return storedInfo ? JSON.parse(storedInfo) : null;
  } catch (error) {
    console.error("Error parsing customer info from local storage:", error);
    return null;
  }
};

// Initial state
const initialState = {
  currentItsMeCustomer: loadCustomerFromLocalStorage(),
  token: null,
  error: null,
  loading: false,
};

// Create slice
const customerSlice = createSlice({
  name: "itsme_customer",
  initialState,
  reducers: {
    signOutCustomer: (state) => {
      state.currentItsMeCustomer = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem("itsme_customer");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login_Customer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Login_Customer.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.currentItsMeCustomer = user;
        state.token = token;
        state.error = null;
        state.loading = false;
        localStorage.setItem("itsme_customer", JSON.stringify(user));
      })
      .addCase(Login_Customer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentItsMeCustomer = null;
        state.token = null;
      });
  },
});

export const { signOutCustomer, clearError } = customerSlice.actions;
export default customerSlice.reducer;

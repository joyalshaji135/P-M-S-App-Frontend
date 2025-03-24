import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import  // Make sure this import matches your API path

// Async thunk for artist login
export const Login_CompanyManagers = createAsyncThunk(
  "artist/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginArtist(email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Selectors
export const selectCurrentArtist = (state) => state.artist.currentArtist;
export const selectArtistToken = (state) => state.artist.token;

// Utility function to handle localStorage
const loadArtistFromLocalStorage = () => {
  try {
    const storedInfo = localStorage.getItem("itsme_artist");
    return storedInfo ? JSON.parse(storedInfo) : null;
  } catch (error) {
    console.error("Error parsing artist info from local storage:", error);
    return null;
  }
};

// Initial state
const initialState = {
  currentArtist: loadArtistFromLocalStorage(),
  token: null,
  error: null,
  loading: false,
};

// Create slice
const artistSlice = createSlice({
  name: "itsme_artist",
  initialState,
  reducers: {
    signOutArtist: (state) => {
      state.currentArtist = null;
      state.token = null;
      state.error = null;
      state.loading = false;
      try {
        localStorage.removeItem("itsme_artist");
      } catch (error) {
        console.error("Error removing artist info from local storage:", error);
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login_Artist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Login_Artist.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.currentArtist = user;
        state.token = token;
        state.error = null;
        state.loading = false;
        try {
          localStorage.setItem("itsme_artist", JSON.stringify(user));
        } catch (error) {
          console.error("Error saving artist info to local storage:", error);
        }
      })
      .addCase(Login_Artist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentArtist = null;
        state.token = null;
      });
  },
});

export const { signOutArtist, clearError } = artistSlice.actions;
export default artistSlice.reducer;

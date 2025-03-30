import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // For localStorage
import adminReducer from "./slices/adminSlice"; // Admin slice
import companyOwnersReducer from "./slices/companyOwnerSlice"; // Company owners slice
import teamManagersReducer from "./slices/teamManagersSlice"; // Team managers slice
import teamMembersReducer from "./slices/teamMembersSlice"; // Team members slice

// Root persist config: Whitelist roles
const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: [], // Leave empty, don't persist the entire store
};

// Role-specific persist config: Store token and user data
const rolePersistConfig = {
  key: "roleData",
  storage,
  whitelist: ["currentUser", "token"], // Persist only currentUser and token
};

// Static reducers for roles
const staticReducers = {
  admin: persistReducer(rolePersistConfig, adminReducer),
  companyOwners: persistReducer(rolePersistConfig, companyOwnersReducer),
  teamManagers: persistReducer(rolePersistConfig, teamManagersReducer),
  teamMembers: persistReducer(rolePersistConfig, teamMembersReducer),
};

// Function to create the root reducer dynamically with async reducers
const createRootReducer = (asyncReducers) =>
  combineReducers({
    ...staticReducers,
    ...asyncReducers, // Merge static reducers with dynamically injected reducers
  });

// Async reducers for dynamic injection
const asyncReducers = {};

// Handle resetting the store and combining reducers dynamically
const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    // Clear persisted data and reset state
    storage.removeItem("persist:root");
    storage.removeItem("persist:roleData");
    state = undefined; // Reset state
  }
  return createRootReducer(asyncReducers)(state, action); // Return the combined reducer
};

// Create the Redux store with dynamic reducer capabilities
const store = configureStore({
  reducer: rootReducer, // Root reducer including async reducers
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

// Method to dynamically inject reducers
store.injectReducer = (key, reducer) => {
  if (!asyncReducers[key]) {
    asyncReducers[key] = reducer; // Add the reducer to asyncReducers
    store.replaceReducer(createRootReducer(asyncReducers)); // Replace the root reducer dynamically
  }
};

// Configure Persistor for Redux Persist
const persistor = persistStore(store);

// Define selectors for accessing commonly used state data
store.selectors = {
  getCurrentUser: (state) => {
    return (
      state.admin?.currentUser ||
      state.companyOwners?.currentUser ||
      state.teamManagers?.currentUser ||
      state.teamMembers?.currentUser
    );
  },
  getCurrentRole: (state) => {
    if (state.admin?.currentUser) return "admin";
    if (state.companyOwners?.currentUser) return "company-owners";
    if (state.teamManagers?.currentUser) return "team-managers";
    if (state.teamMembers?.currentUser) return "team-members";
    return null;
  },
  getToken: (state) => {
    return (
      state.admin?.token ||
      state.companyOwners?.token ||
      state.teamManagers?.token ||
      state.teamMembers?.token
    );
  },
  getAuthLoading: (state) => {
    return (
      state.admin?.loading ||
      state.companyOwners?.loading ||
      state.teamManagers?.loading ||
      state.teamMembers?.loading
    );
  },
  getAuthError: (state) => {
    return (
      state.admin?.error ||
      state.companyOwners?.error ||
      state.teamManagers?.error ||
      state.teamMembers?.error
    );
  },
};

// Export persist and store
export { persistor, store };

// Action to reset the store and clear persisted data
export const resetStore = () => ({ type: "RESET_STORE" });

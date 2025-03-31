import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import adminReducer from "./slices/adminSlice";
import companyOwnersReducer from "./slices/companyOwnerSlice";
import teamManagersReducer from "./slices/teamManagersSlice";
import teamMembersReducer from "./slices/teamMembersSlice";

// Function to create persist config for roles
const createPersistConfig = (role) => ({
  key: role,
  storage,
  whitelist: ["currentUser", "token"],
});

// Wrap each role reducer with its own persist config
const persistedReducers = combineReducers({
  admin: persistReducer(createPersistConfig("admin"), adminReducer),
  companyOwners: persistReducer(createPersistConfig("company-owners"), companyOwnersReducer),
  teamManagers: persistReducer(createPersistConfig("team-managers"), teamManagersReducer),
  teamMembers: persistReducer(createPersistConfig("team-members"), teamMembersReducer),
});

// Root reducer with reset functionality
const rootReducer = (state, action) => {
  if (action.type === "RESET_STORE") {
    persistor.purge(); 
    state = undefined;
  }
  return persistedReducers(state, action);
};

// Create store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Persistor
const persistor = persistStore(store);

store.selectors = {
  getCurrentUser: (state) => {
    const userRole = Object.values(state).find((roleState) => roleState?.currentUser);
    return userRole ? userRole.currentUser : null;
  },
  getCurrentRole: (state) => {
    const roleEntry = Object.entries(state).find(([_, roleState]) => roleState?.currentUser);
    return roleEntry ? roleEntry[0] : null;
  },
  getAuthToken: (state) => {
    const tokenRole = Object.values(state).find((roleState) => roleState?.token);
    return tokenRole ? tokenRole.token : null;
  },
};

// Action to reset store
export const resetStore = () => ({ type: "RESET_STORE" });

export { persistor, store };

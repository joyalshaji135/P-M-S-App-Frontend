import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import adminReducer from './slices/authSlice';
import companyOwnersReducer from './slices/authSliceCustomer'; 
import teamManagersReducer from './slices/authSliceCompanyManagers'; 
import teamMembersReducer from './slices/authSliceCompanyManagers'; 

// Separate persist configs for admin, customer, and artist
const adminPersistConfig = {
  key: 'admin',
  storage,
  whitelist: ['currentPMSAdmin', 'token'], 
};

const companyOwnersPersistConfig = {
  key: 'company-owners',
  storage,
  whitelist: ['currentCompanyOwners', 'token'], 
};

const teamManagersPersistConfig = {
  key: 'team-managers',
  storage,
  whitelist: ['currentTeamManagers', 'token'], 
};

const teamMembersPersistConfig = {
  key: 'team-members',
  storage,
  whitelist: ['currentTeamMembers', 'token'], 
};

// Create persisted reducers separately
const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer);
const persistedCompanyOwnersReducer = persistReducer(companyOwnersPersistConfig, companyOwnersReducer);
const persistedTeamManagersReducer = persistReducer(teamManagersPersistConfig, teamManagersReducer);
const persistedTeamMembersReducer = persistReducer(teamMembersPersistConfig, teamMembersReducer);

// Combine reducers
const rootReducer = combineReducers({
  admin: persistedAdminReducer,
  companyOwners: persistedCompanyOwnersReducer,
  teamManagers: persistedTeamManagersReducer,
  teamMembers: persistedTeamMembersReducer,
});

// Configure store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});
// Create persistor
const persistor = persistStore(store);

export { persistor };
export default store;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import adminReducer from './slices/authSlice';
import customerReducer from './slices/authSliceCustomer'; 
import artistReducer from './slices/authSliceArtist'; 

// Separate persist configs for admin, customer, and artist
const adminPersistConfig = {
  key: 'admin',
  storage,
  whitelist: ['currentItsMeAdmin', 'token'], 
};

const customerPersistConfig = {
  key: 'customer',
  storage,
  whitelist: ['currentItsMeCustomer', 'token'], 
};

const artistPersistConfig = {
  key: 'artist',
  storage,
  whitelist: ['currentItsMeArtist', 'token'], 
};

// Create persisted reducers separately
const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer);
const persistedCustomerReducer = persistReducer(customerPersistConfig, customerReducer);
const persistedArtistReducer = persistReducer(artistPersistConfig, artistReducer);

// Combine reducers
const rootReducer = combineReducers({
  admin: persistedAdminReducer,
  customer: persistedCustomerReducer,
  artist: persistedArtistReducer,
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

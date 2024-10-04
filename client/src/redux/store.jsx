// src/redux/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import interviewReducer from './slices/interviewSlice'
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';
import {thunk} from 'redux-thunk'; // Thunk middleware for async actions


// Set up persist configuration
const persistConfig = {
  key: 'root', // Use lowercase 'key'
  storage,
}

// Combine all reducers (for scalability)
const rootReducer = combineReducers({
  user: userReducer,
  interviews: interviewReducer
  // Add more reducers here, e.g., interviewReducer
  // interview: interviewReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add thunk middleware for async actions
});

// Create a persistor to persist the store
export const persistor = persistStore(store);

export default store;

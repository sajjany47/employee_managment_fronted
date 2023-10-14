import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage: storage,
};
const userPersistConfig = {
  key: "auth",
  storage: storageSession,
};

const rootReducer = combineReducers({
  auth: persistReducer(userPersistConfig, authReducer),
});

const persistReducers = persistReducer(rootPersistConfig, rootReducer);
export const store = configureStore({
  reducer: persistReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

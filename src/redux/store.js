import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/slice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Тимчасовий порожній reducer (замість filters/psychologists)
const dummyReducer = (state = {}, action) => state;

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isLoggedIn"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    filters: dummyReducer, // тимчасово замінює filters
    psychologists: dummyReducer, // тимчасово замінює psychologists
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

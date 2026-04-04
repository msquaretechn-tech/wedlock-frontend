// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./Reducers/user.reducer";
// import connectionSlice from "./Reducers/connection.reducer";
// import { apiSlice } from "./Api/apiSlice";
// import { persistStore, persistReducer } from "redux-persist";
// import { notificationReducer } from "./Reducers/notification.reducers";
// import storage from "redux-persist/lib/storage";

// const persistConfig = {
//   key: "user",
//   storage,
//   whitelist: [
//     "accessToken",
//     "refreshToken",
//     "user",
//     "isPersonalFormFilled",
//     "isQualificationFormFilled",
//     "isOtherFormFilled",
//     "isLocationFormFilled",
//     "isImageFormFilled",
//   ],
// };

// const persistedUserReducer = persistReducer(persistConfig, userReducer.reducer);

// export const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     userReducer: persistedUserReducer,
//     connectionReducer: connectionSlice.reducer,
//     notificationReducer: notificationReducer.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
//       },
//     }).concat(apiSlice.middleware),
// });

// export const persistor = persistStore(store);

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/user.reducer";
import connectionSlice from "./Reducers/connection.reducer";
import { apiSlice } from "./Api/apiSlice";
import { persistStore, persistReducer } from "redux-persist";
import { notificationReducer } from "./Reducers/notification.reducers";

// SSR-safe storage
const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

// Default to noop storage
let storage = createNoopStorage();

// Dynamically load localStorage in the browser
if (typeof window !== "undefined") {
  import("redux-persist/lib/storage").then((mod) => {
    storage = mod.default as any;
  });
}

const persistConfig = {
  key: "user",
  storage,
  whitelist: [
    "accessToken",
    "refreshToken",
    "user",
    "isPersonalFormFilled",
    "isQualificationFormFilled",
    "isOtherFormFilled",
    "isLocationFormFilled",
    "isImageFormFilled",
  ],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer.reducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    userReducer: persistedUserReducer,
    connectionReducer: connectionSlice.reducer,
    notificationReducer: notificationReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
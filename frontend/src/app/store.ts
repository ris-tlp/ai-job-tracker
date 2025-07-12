import { configureStore } from "@reduxjs/toolkit";
import { parseImageApi } from "../services/parseImageApi";

export const store = configureStore({
  reducer: {
    [parseImageApi.reducerPath]: parseImageApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(parseImageApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import { parseImageApi } from "@/services/parseImageApi";
import { analyzeTextApi } from "@/services/analyzeTextApi";

export const store = configureStore({
  reducer: {
    [parseImageApi.reducerPath]: parseImageApi.reducer,
    [analyzeTextApi.reducerPath]: analyzeTextApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(parseImageApi.middleware, analyzeTextApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

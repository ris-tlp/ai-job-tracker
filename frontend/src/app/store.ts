import { configureStore } from "@reduxjs/toolkit";
import { parseImageApi } from "@/services/parseImageApi";
import { analyzeTextApi } from "@/services/analyzeTextApi";
import { jobApi } from "@/services/jobApi";

export const store = configureStore({
  reducer: {
    [parseImageApi.reducerPath]: parseImageApi.reducer,
    [analyzeTextApi.reducerPath]: analyzeTextApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      parseImageApi.middleware,
      analyzeTextApi.middleware,
      jobApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

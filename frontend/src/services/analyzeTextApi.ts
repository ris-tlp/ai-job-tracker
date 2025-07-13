import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface AnalyzeTextRequest {
  text: string;
}

export interface AnalyzeTextResponse {
  job_title: string;
  company_name?: string;
  location?: string;
  visa_sponsorship?: boolean;
  tech_stack: string[];
  soft_skills: string[];
  years_experience?: string;
}

export const analyzeTextApi = createApi({
  reducerPath: "analyzeTextApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/analyzer",
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    analyzeText: builder.mutation<AnalyzeTextResponse, AnalyzeTextRequest>({
      query: (body) => ({
        url: "jobs/analyzed-images",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const { useAnalyzeTextMutation } = analyzeTextApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CreateJobRequest {
  job_title: string;
  company_name?: string;
  location?: string;
  visa_sponsorship: string;
  tech_stack: string;
  soft_skills: string;
  years_experience?: string;
}

export interface CreateJobResponse {
  id: number;
  job_title: string;
  company_name?: string;
  location?: string;
  visa_sponsorship: string;
  tech_stack: string;
  soft_skills: string;
  years_experience?: string;
}

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/jobs",
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    createJob: builder.mutation<CreateJobResponse, CreateJobRequest>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const { useCreateJobMutation } = jobApi;

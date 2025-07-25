import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const VisaSponsorshipStatus = {
  AVAILABLE: "available",
  NOT_AVAILABLE: "not_available",
  UNAVAILABLE: "unavailable",
} as const;

export type VisaSponsorshipStatus =
  (typeof VisaSponsorshipStatus)[keyof typeof VisaSponsorshipStatus];

export type CreateJobRequest = {
  job_title: string;
  company_name?: string;
  location?: string;
  visa_sponsorship: VisaSponsorshipStatus;
  tech_stack: string;
  soft_skills: string;
  years_experience?: string;
};

export type Job = {
  id: number;
  job_title: string;
  company_name?: string;
  location?: string;
  visa_sponsorship: VisaSponsorshipStatus;
  tech_stack: string;
  soft_skills: string;
  years_experience?: string;
  created_at: string;
  updated_at: string;
};

export type CreateJobResponse = Job;

export type GetJobsResponse = {
  jobs: Job[];
};

export type ApiError = {
  error: {
    message: string;
    type: string;
    details?: Record<string, unknown>;
  };
};

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/jobs",
    prepareHeaders: (headers) => headers,
  }),
  endpoints: (builder) => ({
    createJob: builder.mutation<CreateJobResponse, CreateJobRequest>({
      query: (body) => ({
        url: "jobs",
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    getJobs: builder.query<GetJobsResponse, void>({
      query: () => ({
        url: "jobs",
      }),
    }),
  }),
});

export const { useCreateJobMutation, useGetJobsQuery } = jobApi;

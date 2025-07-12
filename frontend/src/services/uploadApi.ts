import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type ParseImageResponse = {
  id: string;
  image_name: string;
  parsed_text: string;
  created_at: string;
  updated_at: string;
};

export const parseImageApi = createApi({
  reducerPath: "parseImageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    uploadImage: builder.mutation<ParseImageResponse, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "jobs/parsed-images",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadImageMutation } = parseImageApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define headers for API authentication
const cryptoNewsHeaders = {
  "x-rapidapi-key": "689f338bf2msh3f715229286feb8p1ed835jsn4a9495b10f5a",
  "x-rapidapi-host": "google-news13.p.rapidapi.com",
};

// Base URL for the Google News API
const baseUrl = "https://google-news13.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNewsByCategory: builder.query({
      query: ({ category, languageRegion }) =>
        createRequest(`/${category}?lr=${languageRegion}`),
    }),
  }),
});

export const { useGetNewsByCategoryQuery } = cryptoNewsApi;

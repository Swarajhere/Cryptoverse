import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
  "x-rapidapi-key": import.meta.env.VITE_GOOGLE_NEWS_API_KEY,
  "x-rapidapi-host": import.meta.env.VITE_GOOGLE_NEWS_API_HOST,
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

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const tasksApiSlice = createApi({
  reducerPath: "tasksApi",
  baseQuery,
  endpoints: (builder) => ({
    // getPuzzles: builder.query({
    //   query: () => ({
    //     url: "puzzles",
    //   }),
    //   transformResponse: (response) => response.data,
    // }),
    register: builder.mutation({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "authentication",
        method: "POST",
        body,
      }),
    }),
  }),
});

// reducer
export const tasksApiSliceReducer = tasksApiSlice.reducer;
// hooks
export const { useLoginMutation, useRegisterMutation } = tasksApiSlice;

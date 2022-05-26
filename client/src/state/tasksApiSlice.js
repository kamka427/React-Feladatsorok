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
    getTasks: builder.query({
      query: () => ({
        url: "tasklists",
      }),
      transformResponse: (response) => response.data,
    }),

    getTasksWithPaginate: builder.query({
      query: (page) => ({
        url: `tasklists?$skip=${page * 10}&$limit=10`,
      }),
      transformResponse: (response) => response.data,
    }),

    getTaskById: builder.query({
      query: (id) => ({
        url: `tasklists/${id}`,
      }),
      transformResponse: (response) => response.data,
    }),

    createTask: builder.mutation({
      mutation: (task) => ({
        url: "tasklists",
        method: "POST",
        body: {
          ...task,
        },
      }),
    }),

    modifyTask: builder.mutation({
      mutation: (task) => ({
        url: `tasklists/${task.id}`,
        method: "PATCH",
        body: {
          ...task,
        },
      }),
    }),

    deleteTask: builder.mutation({
      mutation: (id) => ({
        url: `tasklists/${id}`,
        method: "DELETE",
      }),
    }),

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
export const { useGetTasksWithPaginateQuery, useLoginMutation, useRegisterMutation } = tasksApiSlice;
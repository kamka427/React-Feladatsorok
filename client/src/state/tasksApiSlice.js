import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:3030/";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const tasksApiSlice = createApi({
  reducerPath: "tasksApi",
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getTasksWithPaginate: builder.query({
      query: (page) => ({
        url: `tasks?$skip=${page * 10}&$limit=10`,
      }),
    }),

    getTasklists: builder.query({
      query: () => ({
        url: "tasklists",
      }),
    }),

    getTaskslistsWithPaginate: builder.query({
      query: (page) => ({
        url: `tasklists?$skip=${page * 10}&$limit=10`,
      }),
    }),

    createTasklist: builder.mutation({
      query: (body) => ({
        url: "tasklists",
        method: "POST",
        body,
      }),
    }),

    modifyTasklist: builder.mutation({
      query: (task) => ({
        url: `tasklists/${task.id}`,
        method: "PATCH",
        body: {
          ...task,
        },
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
export const {
  useGetTasksWithPaginateQuery,
  useGetTasklistsQuery,
  useGetTaskslistsWithPaginateQuery,
  useCreateTasklistMutation,
  useModifyTasklistMutation,
  useRegisterMutation,
  useLoginMutation,
} = tasksApiSlice;

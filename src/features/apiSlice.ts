import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // JSON Server API endpoint
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "tasks",
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
    }),
    updateTask: builder.mutation({
      query: ({ id, ...task }) => ({
        url: `tasks/${id}`,
        method: "PUT",
        body: task,
      }),
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = api

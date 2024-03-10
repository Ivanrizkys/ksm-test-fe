import { Todo } from "@/types/todo";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodo: builder.query<Todo[], string>({
      query: (page) => `/todos?_start=${page}&_limit=10`,
      providesTags: (result, error, page) =>
        result
          ? [
              { type: "Todo", id: page },
              { type: "Todo", id: "LIST" },
            ]
          : [{ type: "Todo", id: "LIST" }],
    }),
    addTodo: builder.mutation<Todo, Omit<Todo, "id">>({
      query(body) {
        return {
          url: "/todos",
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Todo", id: "LIST" }],
    }),
  }),
});

export const { useGetTodoQuery, useAddTodoMutation } = todoApi;

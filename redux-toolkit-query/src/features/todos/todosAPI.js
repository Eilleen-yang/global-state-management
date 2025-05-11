import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// RTK Query service 생성
export const todoApi = createApi({
  reducerPath: "todosApi", // store에 등록될 이름
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "todos",
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: "todos",
        method: "POST",
        body: newTodo,
      }),
    }),
  }),
});

// 자동 생성된 훅 export
export const { useGetTodosQuery, useAddTodoMutation } = todoApi;

// 기존 코드
export async function fetchTodos() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  if (!response.ok) {
    throw new Error("데이터를 가져오는 데 실패했습니다.");
  }
  const data = await response.json();
  return data;
}

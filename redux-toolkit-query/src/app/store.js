import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import { todoApi } from "../features/todos/todosAPI";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    [todoApi.reducerPath]: todoApi.reducer, // RTK Query reducer 등록
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware), // RTK Query middleware 등록
});

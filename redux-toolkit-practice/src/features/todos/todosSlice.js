import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTodos } from "./todosAPI";

const initialState = {
  // 기본값 상태
  todos: [],
  isLoading: false,
  error: null,
};

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (_, thunkAPI) => {
    try {
      const response = await fetchTodos();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // 동기 액션
    addTodo(state, action) {
      state.todos.push({ id: Date.now(), title: action.payload });
    },
    removeTodo(state, action) {
      state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // 비동기 처리
    builder
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addTodo, removeTodo } = todoSlice.actions; // reeducers
export default todoSlice.reducer;

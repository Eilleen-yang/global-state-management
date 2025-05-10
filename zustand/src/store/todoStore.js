import { create } from "zustand";

// async function fetchTodosFormAPI() {
//   const response = await fetch(
//     "https://jsonplaceholder.typicode.com/todos?_limit=5"
//   );
//   if (!response.ok) throw new Error("할 일 목록 가져오기 실패");

//   const data = await response.json();
//   return data;
// }

let id = 1;

export const useTodoStore = create((set) => ({
  todos: [],
  // isLoading: false,
  // error: null,
  // actions: {
  //   fetchTodos: async () => {
  //     set({ isLoading: true, error: null });
  //     try {
  //       const todos = await fetchTodosFormAPI();
  //       set({ todos, isLoading: false }); // todos 단축 문법
  //     } catch (error) {
  //       set({ error: error.message, isLoading: false });
  //     }
  //   },
  // },
  addTodo: (title) =>
    set((state) => ({
      todos: [...state.todos, { id: id++, title, completed: false }],
    })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));

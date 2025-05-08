import { useEffect } from "react";
import { useTodoStore } from "../store/todoStore";

export default function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const isLoading = useTodoStore((state) => state.isLoading);
  const error = useTodoStore((state) => state.error);

  const { fetchTodos, removeTodo } = useTodoStore((state) => state.actions);

  useEffect(() => {
    fetchTodos();
  }, []);

  if (isLoading) return <p>...Loading.</p>;
  if (error) return <p>에러 발생 : {error} </p>;
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.title}
          <button onClick={() => removeTodo(todo.id)}>삭제</button>
        </li>
      ))}
    </ul>
  );
}

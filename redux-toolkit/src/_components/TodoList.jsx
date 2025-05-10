import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, removeTodo } from "../features/todos/todosSlice";

export default function TodoList() {
  const { todos, isLoading, error } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  if (isLoading) return <p>...로딩 중...</p>;
  if (error) return <p>error .. {error}</p>;
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span>{todo.title}</span>
          <button onClick={() => dispatch(removeTodo(todo.id))}>삭제</button>
        </li>
      ))}
    </ul>
  );
}

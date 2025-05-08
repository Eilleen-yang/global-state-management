import { useEffect } from "react";
import { useTodoStore } from "../store/todoStore";
import { useFilterStore } from "../store/filterStore";

export default function TodoList() {
  // const todos = useTodoStore((state) => state.todos);
  // const isLoading = useTodoStore((state) => state.isLoading);
  // const error = useTodoStore((state) => state.error);
  // 필요한 액션함수만 불러오면 된다.
  const { todos, toggleTodo, removeTodo } = useTodoStore();

  const filter = useFilterStore((state) => state.filter);
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  // useEffect(() => {
  //   // 컴포넌트가 처음 마운트될 때만 서버에서 할일 목록을 가져온다.
  //   fetchTodos();
  // }, []);

  // if (isLoading) return <p>...로딩중</p>;
  // if (error) return <p>에러 발생 : {error}</p>;

  useEffect(() => {
    fetchTodos();
  }, []);

  if (isLoading) return <p>...Loading.</p>;
  if (error) return <p>에러 발생 : {error} </p>;
  return (
    <ul>
      {filteredTodos.map((todo) => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.title}
          </label>
          <button onClick={() => removeTodo(todo.id)}>삭제</button>
        </li>
      ))}
      {/* {todos.map((todo) => (
        <li key={todo.id}>
          {todo.title}
          <button onClick={() => removeTodo(todo.id)}>삭제</button>
        </li>
      ))} */}
    </ul>
  );
}

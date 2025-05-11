import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, removeTodo } from "../features/todos/todosSlice";
import { useGetTodosQuery } from "../features/todos/todosAPI";

export default function TodoList() {
  // const { todos, isLoading, error } = useSelector((state) => state.todos);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getTodos());
  // }, [dispatch]);

  const { data: todos, error, isLoading, refetch } = useGetTodosQuery();

  if (isLoading) return <p>...로딩 중...</p>;
  if (error) return <p>error .. {error.message}</p>;
  return (
    <div>
      <h2>Todo 목록</h2>
      {/* 수동 refetch 버튼 */}
      <button onClick={refetch}>다시 불러오기</button>
      <ul>
        {/* 200개가 넘어오기에 slice로 제한 */}
        {todos?.slice(0, 5).map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <span>{todo.completed ? "완료" : "미완료"}</span>
            {/* <button onClick={() => dispatch(removeTodo(todo.id))}>삭제</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

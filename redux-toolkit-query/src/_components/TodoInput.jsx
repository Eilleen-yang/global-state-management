import { useState } from "react";
import { useAddTodoMutation } from "../features/todos/todosAPI";
// import { addTodo } from "../features/todos/todosSlice";
// import { useDispatch } from "react-redux";

export default function TodoInput() {
  const [text, setText] = useState("");
  const [addTodo, { isLoading, error }] = useAddTodoMutation();
  // const dispatch = useDispatch();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    // dispatch(addTodo(text));
    // setText("");
    try {
      await addTodo({
        text,
        completed: false,
      });
      setText(""); // 성공 후, input값 비우기
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };
  return (
    <form onSubmit={handleAdd}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할일을 입력해주세요."
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "추가 중..." : "추가하기"}
      </button>
      {error && <p style={{ color: "red" }}>에러 발생 : {error.message}</p>}
    </form>
  );
}

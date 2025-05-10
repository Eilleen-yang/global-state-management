import { useState } from "react";
import { addTodo } from "../features/todos/todosSlice";
import { useDispatch } from "react-redux";

export default function TodoInput() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim() === "") return;
    dispatch(addTodo(text));
    setText("");
  };
  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할일을 입력해주세요."
      />
      <button onClick={handleAdd}>추가</button>
    </div>
  );
}

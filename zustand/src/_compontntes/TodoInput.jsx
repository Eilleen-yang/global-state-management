import { useState } from "react";
import { useTodoStore } from "../store/todoStore";

export default function TodoInput() {
  const [inputValue, setInputValue] = useState("");
  const { addTodo } = useTodoStore((state) => state.actions);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() === "") return;

    addTodo(inputValue);
    setInputValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="할 일을 입력해주세요."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">추가</button>
    </form>
  );
}

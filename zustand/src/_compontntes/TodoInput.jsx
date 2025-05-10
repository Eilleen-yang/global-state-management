import { useState } from "react";
import { useTodoStore } from "../store/todoStore";

export default function TodoInput() {
  // const [inputValue, setInputValue] = useState("");
  const [text, setText] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!inputValue.trim()) return;
  //   addTodo(inputValue);
  //   setInputValue("");
  // };

  const handleAdd = () => {
    if (!text.trim()) return;

    addTodo(text);
    setText("");
  };
  return (
    <div
    // onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="할 일을 입력하세요.."
        // value={inputValue}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleAdd}>추가</button>
    </div>
  );
}

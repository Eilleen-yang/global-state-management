import { create } from "zustand";

async function fetchTodosFormAPI() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  if (!response.ok) throw new Error("할 일 목록 가져오기 실패");

  const data = await response.json();
  return data;
}

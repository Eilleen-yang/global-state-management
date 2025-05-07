export async function fetchTodos() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  if (!response.ok) {
    throw new Error("데이터를 가져오는 데 실패했습니다.");
  }
  const data = await response.json();
  return data;
}

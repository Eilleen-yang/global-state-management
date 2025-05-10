import TodoInput from "./_components/TodoInput";
import TodoList from "./_components/TodoList";

function App() {
  return (
    <div>
      <h3>Redux-Toolkit 할일 목록</h3>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;

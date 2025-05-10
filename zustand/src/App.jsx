import "./App.css";
import TodoInput from "./_compontntes/TodoInput";
import TodoList from "./_compontntes/TodoList";

function App() {
  return (
    <div>
      <h1>할 일 목록</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
}

export default App;

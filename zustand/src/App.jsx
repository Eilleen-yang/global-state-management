import "./App.css";
import FilterButtons from "./_compontntes/FilterButtons";
import TodoInput from "./_compontntes/TodoInput";
import TodoList from "./_compontntes/TodoList";

function App() {
  return (
    <div>
      <h1>Zustand 할 일 앱</h1>
      <TodoInput />
      <FilterButtons />
      <TodoList />
    </div>
  );
}

export default App;

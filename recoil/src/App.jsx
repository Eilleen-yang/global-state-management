import "./App.css";
import ThemeToggle from "./components/ThemeToggle";
import UserForm from "./components/UserForm";
import UserInfo from "./components/UserInfo";
import UserList from "./components/UserList";
import "./style/theme.css";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Recoil Project</h2>
      <ThemeToggle />
      <UserForm />
      <UserInfo />
      <UserList />
    </div>
  );
}

export default App;

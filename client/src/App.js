import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TodoList from "./todo/TodoList";
import TodoDetail from "./todo/TodoDetail";
import "./style.css";
import UserDetail from "./user/UserDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/todo/:todoId" element={<TodoDetail />} />
        <Route path="/todo/:todoId/user/:userId" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

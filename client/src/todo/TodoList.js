import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query GetAllTodo {
    getTodos {
      id
      todo
      user {
        id
        username
      }
    }
  }
`;

function TodoList({ list }) {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/todo/${id}`);
  };

  const { loading, data } = useQuery(query);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h1>Loading Todos...</h1>
      </div>
    );
  }

  return (
    <div className="cards-wrapper">
      <h1 className="todo-title">Todo List</h1>
      <div className="cards-container">
        {data.getTodos.map((item) => (
          <div
            key={item.id}
            className="styled-card"
            onClick={() => handleCardClick(item.id)}
          >
            <div className="card-id">ID: {item.id}</div>
            <h3 className="card-title">{item.todo}</h3>
            <p className="card-user">User: {item.user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;

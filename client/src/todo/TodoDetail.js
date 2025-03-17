import { gql, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

const query = gql`
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      todo
      user {
        id
        username
      }
    }
  }
`;

function TodoDetail() {
  const { todoId } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(query, {
    variables: { id: parseInt(todoId) },
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h1>Loading Todo Details...</h1>
      </div>
    );
  }

  if (error) {
    return <div>Error fetching todo: {error.message}</div>;
  }

  const todo = data.getTodo;

  const handleBackClick = () => {
    navigate("/");
  };

  const handleUserClick = (userId) => {
    console.log({ todoId, userId });
    navigate(`/todo/${todoId}/user/${userId}`);
  };

  return (
    <div className="detail-wrapper">
      <h1 className="detail-title">Todo Details</h1>
      <div className="detail-card">
        <div className="detail-id">ID: {todo.id}</div>
        <h2 className="detail-title-text">{todo.todo}</h2>

        {/* User Info Section */}
        <div className="todo-info-section">
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">User</span>
              <span className="info-value">{todo.user.username}</span>
            </div>
          </div>
        </div>

        {/* Button Section */}
        <div className="button-section">
          <button
            className="user-button"
            onClick={() => handleUserClick(todo.user.id)}
          >
            View User
          </button>
        </div>
      </div>
      <div className="button-container">
        <button className="back-button" onClick={handleBackClick}>
          Back to List
        </button>
      </div>
    </div>
  );
}

export default TodoDetail;

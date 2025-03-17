import { gql, useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

const query = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      phone
    }
  }
`;

function UserDetail() {
  const { userId, todoId } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(query, {
    variables: { id: parseInt(userId) },
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h1>Loading User Details...</h1>
      </div>
    );
  }

  if (error) {
    return <div>Error fetching user: {error.message}</div>;
  }

  const user = data.getUser;

  if (!user) {
    return <div>User not found!</div>;
  }

  const handleBackClick = (id) => {
    navigate(`/todo/${todoId}`);
  };

  return (
    <div className="detail-wrapper">
      <h1 className="detail-title">User Details</h1>
      <div className="detail-card">
        <div className="detail-id">ID: {user.id}</div>
        <h2 className="detail-title-text">{user.name}</h2>

        <div className="user-info-grid">
          <div className="info-item">
            <span className="info-label">Username</span>
            <span className="info-value">{user.username}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Phone</span>
            <span className="info-value">{user.phone}</span>
          </div>
        </div>
      </div>
      <div className="button-container">
        <button className="back-button" onClick={handleBackClick}>
          Back to Todo
        </button>
      </div>
    </div>
  );
}

export default UserDetail;

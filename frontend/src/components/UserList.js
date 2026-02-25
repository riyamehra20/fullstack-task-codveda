import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../services/userService";

function UserList() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data.data);
    } catch (err) {
      setError("Failed to fetch users. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setMessage("User deleted successfully!");
      fetchUsers();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  if (loading) return <div className="loading">⏳ Loading users...</div>;

  return (
    <div className="card">
      <h2>All Users</h2>
      {error   && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}

      {users.length === 0 ? (
        <div className="empty">
          <p>No users found.</p>
          <Link to="/add" className="btn btn-primary" style={{ marginTop: "15px" }}>
            Add First User
          </Link>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age || "—"}</td>
                <td>
                  <Link to={`/edit/${user._id}`} className="btn btn-warning">Edit</Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserList;

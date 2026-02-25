import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/userService";

function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createUser(formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>➕ Add New User</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text" name="name" placeholder="Enter full name"
            value={formData.name} onChange={handleChange} required
          />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email" name="email" placeholder="Enter email"
            value={formData.email} onChange={handleChange} required
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number" name="age" placeholder="Enter age"
            value={formData.age} onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>
        <button type="button" className="btn btn-primary" style={{ marginLeft: "10px" }}
          onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddUser;

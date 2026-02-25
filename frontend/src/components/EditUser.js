import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../services/userService";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id);
        const { name, email, age } = res.data.data;
        setFormData({ name, email, age: age || "" });
      } catch (err) {
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await updateUser(id, formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">⏳ Loading user...</div>;

  return (
    <div className="card">
      <h2>✏️ Edit User</h2>
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
        <button type="submit" className="btn btn-success" disabled={saving}>
          {saving ? "Saving..." : "Update User"}
        </button>
        <button type="button" className="btn btn-primary" style={{ marginLeft: "10px" }}
          onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditUser;

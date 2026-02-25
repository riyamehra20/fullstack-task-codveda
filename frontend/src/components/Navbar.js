import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/" className="brand">👥 User Manager</Link>
      <div>
        <Link to="/">All Users</Link>
        <Link to="/add">+ Add User</Link>
      </div>
    </nav>
  );
}

export default Navbar;

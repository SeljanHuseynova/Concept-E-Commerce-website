import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "selcan@gmail.com" && password === "selcan12345") {
      localStorage.setItem("admin", JSON.stringify({ email }));
      navigate("/admin");
    } else {
      setError("Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={handleSubmit}>
        <div className="email">
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter your Mail..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;

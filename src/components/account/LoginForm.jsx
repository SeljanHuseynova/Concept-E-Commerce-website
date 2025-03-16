import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "../../redux/accountSlice";

const LoginForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      setError("Please enter both email and password.");
      return;
    }

    dispatch(loginUser(userData))
      .then((resultAction) => {
        if (loginUser.fulfilled.match(resultAction)) {
          navigate("/Account");
          closeModal();
        } else {
          setError(resultAction.payload || "Invalid email or password.");
        }
      })
      .catch(() => {
        setError("An error occurred, please try again.");
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}

      <input
        type="text"
        className="user-name"
        name="email"
        autoComplete="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
      />

      <input
        type="password"
        className="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        value={userData.password}
        onChange={handleChange}
      />

      <button type="submit">LOG IN</button>
    </form>
  );
};

export default LoginForm;

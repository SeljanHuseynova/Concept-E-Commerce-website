import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Breadcrumb from "../Global/breadcrumb/BreamCrumb";
import { loginUser } from "../../redux/accountSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.email || !userData.password) {
      return;
    }

    dispatch(loginUser(userData))
      .then((resultAction) => {
        if (loginUser.fulfilled.match(resultAction)) {
          navigate("/account");
        } else {
          alert(resultAction.payload);
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("An error occurred, please try again.");
      });
  };

  return (
    <>
      <Breadcrumb />
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h4>LOGIN</h4>
          <input
            type="text"
            className="user-name"
            name="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={userData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            className="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={userData.password}
            onChange={handleChange}
          />
          <button type="submit">LOGIN</button>
        </form>
      </div>
    </>
  );
};

export default Login;

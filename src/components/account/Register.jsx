import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Breadcrumb from "../Global/breadcrumb/BreamCrumb";
import { registerUser } from "../../redux/accountSlice";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !userData.name ||
      !userData.surname ||
      !userData.email ||
      !userData.password
    ) {
      return;
    }

    dispatch(registerUser(userData))
      .then((resultAction) => {
        if (registerUser.fulfilled.match(resultAction)) {
          alert("Registration successful!");
          navigate('/')
        } else {
          alert(resultAction.payload);
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  return (
    <>
      <Breadcrumb />
      <div className="register">
        <form onSubmit={handleSubmit}>
          <h5>REGISTER</h5>
          <input
            type="text"
            name="name"
            placeholder="First Name"
            value={userData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="surname"
            placeholder="Last Name"
            autoComplete="name"
            value={userData.surname}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            value={userData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={userData.password}
            onChange={handleChange}
          />
          <button type="submit">REGISTER</button>
        </form>
      </div>
    </>
  );
};

export default Register;

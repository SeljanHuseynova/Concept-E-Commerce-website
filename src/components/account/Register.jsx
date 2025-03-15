import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Breadcrumb from "../Global/breadcrumb/BreamCrumb";
import { registerUser } from "../../redux/accountSlice";
import { useNavigate } from "react-router";
import NewCustomers from "./NewCustomers";
import Swal from "sweetalert2";


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!userData.name) {
      newErrors.name = "This field cannot be empty";
    } else if (!/^[A-Za-z]{4,6}$/.test(userData.name)) {
      newErrors.name = "Name must be 4-6 letters long";
    }
    if (!userData.email) {
      newErrors.email = "This field cannot be empty";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!userData.password) {
      newErrors.password = "This field cannot be empty";
    } else if (userData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }
    if (!userData.surname) {
      newErrors.surname = "This field cannot be empty";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(registerUser(userData))
      .then((resultAction) => {
        if (registerUser.fulfilled.match(resultAction)) {
          Swal.fire({
            title: "Success!",
            text: "Registration successful!",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/");
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
      <div className="account-form">
        <div className="account-title">
          <h4>Create Account</h4>
        </div>
        <div className="account-container">
          <form onSubmit={handleSubmit}>
            <div className="part">
              <label>First name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="part">
              <label>Last name</label>
              <input
                type="text"
                name="surname"
                autoComplete="name"
                value={userData.surname}
                onChange={handleChange}
              />
              {errors.surname && <p className="error">{errors.surname}</p>}
            </div>
            <div className="part">
              <label>Email</label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={userData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="part">
              <label>Password</label>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={userData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <button type="submit">REGISTER</button>
          </form>
          <NewCustomers />
        </div>
      </div>
    </>
  );
};

export default Register;

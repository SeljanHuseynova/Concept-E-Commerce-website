import React, { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Breadcrumb from "../Global/breadcrumb/BreamCrumb";
import { registerUser } from "../../redux/accountSlice";
import { Link, useNavigate } from "react-router";
import NewCustomers from "./NewCustomers";
import Swal from "sweetalert2";
import { LanguageContext } from "../../context/LanguageProvider";
import AOS from "aos";
import "aos/dist/aos.css"; 

const Register = () => {
  const { t } = useContext(LanguageContext);
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

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); 
  }, []);

  return (
    <>
      <Breadcrumb />
      <div className="account-form" data-aos="fade-up">
        <div className="account-title" data-aos="fade-left">
          <h4>{t("account.button")}</h4>
        </div>
        <div className="account-container">
          <form onSubmit={handleSubmit}>
            <div className="part" data-aos="fade-right">
              <label>{t("account.first")}</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="part" data-aos="fade-right">
              <label>{t("account.last")}</label>
              <input
                type="text"
                name="surname"
                autoComplete="name"
                value={userData.surname}
                onChange={handleChange}
              />
              {errors.surname && <p className="error">{errors.surname}</p>}
            </div>
            <div className="part" data-aos="fade-right">
              <label>{t("account.email")}</label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={userData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="part" data-aos="fade-right">
              <label>{t("account.password")}</label>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                value={userData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <button type="submit" data-aos="fade-up">{t("account.register")}</button>
            <Link to='/login' className="log-in">Already have an account?</Link>
          </form>
          <NewCustomers data-aos="fade-up" />
        </div>
      </div>
    </>
  );
};

export default Register;

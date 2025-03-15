import React from "react";
import LoginForm from "../account/LoginForm";
import { Link } from "react-router-dom";

const NotLogged = ({closeModal}) => {
  return (
    <div className="account-modal">
      <div className="main">
      <div className="top">
        <h2>CUSTOMER LOGIN</h2>
        <span>If you are already registered, please log in.</span>
        <LoginForm closeModal={closeModal}/>
      </div>
      <div className="bottom">
        <span>
          Don't have an account? Create and enjoy a new shopping experience.
        </span>
        <Link to ='register' onClick={closeModal} className="create-new-account">CREATE A NEW ACCOUNT</Link>
      </div>
      </div>
    </div>
  );
};

export default NotLogged;

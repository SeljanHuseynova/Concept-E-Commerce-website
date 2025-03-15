import React from "react";
import Breadcrumb from "../Global/breadcrumb/BreamCrumb";
import NewCustomers from "./NewCustomers";
import LoginForm from "./LoginForm";
const Login = () => {
  return (
    <>
      <Breadcrumb />
      <div className="account-form">
        <div className="account-title">
          <h4>Login</h4>
        </div>
        <div className="account-container">
         <LoginForm/>
          <NewCustomers />
        </div>
      </div>
    </>
  );
};

export default Login;

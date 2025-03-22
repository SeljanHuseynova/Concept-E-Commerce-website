import React, { useContext, useEffect } from "react";
import Breadcrumb from "../Global/breadcrumb/BreamCrumb";
import NewCustomers from "./NewCustomers";
import LoginForm from "./LoginForm";
import { LanguageContext } from "../../context/LanguageProvider";
import AOS from "aos";
import "aos/dist/aos.css"; 

const Login = () => {
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); 
  }, []);

  return (
    <>
      <Breadcrumb />
      <div className="account-form" data-aos="fade-up">
        <div className="account-title" data-aos="fade-left">
          <h4>{t("account.head")}</h4>
        </div>
        <div className="account-container">
          <LoginForm data-aos="fade-right" />
          <NewCustomers data-aos="fade-left" />
        </div>
      </div>
    </>
  );
};

export default Login;

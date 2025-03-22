import React,{useContext} from "react";
import LoginFormModal from './LoginFormModal';
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageProvider";

const NotLogged = ({closeModal}) => {
  const {t} = useContext(LanguageContext);
  return (
    <div className="account-modal">
      <div className="main">
      <div className="top">
        <h2>{t("account-modal.head-2")}</h2>
        <span>{t("account-modal.span-3")}</span>
        <LoginFormModal closeModal={closeModal}/>
      </div>
      <div className="bottom">
        <span>
        {t("account-modal.span-4")}
        </span>
        <Link to ='register' onClick={closeModal} className="create-new-account">{t("account-modal.button-2")}</Link>
      </div>
      </div>
    </div>
  );
};

export default NotLogged;

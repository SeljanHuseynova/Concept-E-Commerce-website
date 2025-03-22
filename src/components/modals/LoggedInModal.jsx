import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { logoutUser } from "../../redux/accountSlice";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LanguageContext } from "../../context/LanguageProvider";

const LoggedInModal = ({ closeModal }) => {
  const { t } = useContext(LanguageContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser()).then(() => navigate("/"));
    closeModal();
  };
  const goToAccount = () => {
    navigate("/account");
    closeModal();
  };
  const goToAdresses = () => {
    navigate("/Adresses");
    closeModal();
  };
  const goToRecover = () => {
    navigate("account/recover");
    closeModal();
  }
  return (
    <div className="account-modal">
      <h2>{t("account-modal.head")}</h2>
      <span>
        {t("account-modal.span")}Access your account information and settings
        below.
      </span>
      <div className="main">
        <ul>
          <li onClick={goToAccount}>
            {t("account-modal.details")}
            <IoIosArrowRoundForward className="icon" />
          </li>
          <li onClick={goToAdresses}>
            {t("account-modal.address")}
            <IoIosArrowRoundForward className="icon" />
          </li>
          <li onClick={goToRecover}>
            {t("account-modal.forgot")}
            <IoIosArrowRoundForward className="icon" />
          </li>
          <li onClick={logout}>
            {t("account-modal.log-out")}
            <IoIosArrowRoundForward className="icon" />
          </li>
        </ul>
        <div className="bottom">
          <span>{t("account-modal.span-2")}.</span>
          <Link to="/products" className="link" onClick={closeModal}>
            {t("account-modal.button")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoggedInModal;

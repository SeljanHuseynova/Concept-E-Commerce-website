import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { logoutUser } from "../../redux/accountSlice";
import { IoIosArrowRoundForward } from "react-icons/io";

const LoggedInModal = ({ closeModal }) => {
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
  return (
    <div className="account-modal">
      <h2>ACCOUNT</h2>
      <span>Access your account information and settings below.</span>
      <div className="main">
      <ul>
        <li onClick={goToAccount}>Account Details <IoIosArrowRoundForward className="icon"/></li>
        <li onClick={goToAdresses}>Adresses <IoIosArrowRoundForward className="icon"/></li>
        <li onClick={logout}>Log Out <IoIosArrowRoundForward className="icon"/></li>
      </ul>
      <div className="bottom">
        <span>Enjoy your shopping! Browse our latest collections now.</span>
        <Link to='/products' className="link" onClick={closeModal}>Start Shopping</Link>
      </div>
      </div>
    </div>
  );
};

export default LoggedInModal;

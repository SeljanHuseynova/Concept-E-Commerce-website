import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress, logoutUser } from "../../redux/accountSlice";
import { Link, useNavigate } from "react-router";
import BreamCrumb from '../Global/breadcrumb/BreamCrumb';
import { LanguageContext } from "../../context/LanguageProvider";


const Account = () => {
  const {t} = useContext(LanguageContext);
  const currentUser = useSelector((state) => state.users?.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser()).then(() => navigate("/"));
  };
  useEffect(()=>{
    dispatch(fetchAddress(currentUser.id))
  },[])
  return (
    <>
    <BreamCrumb/>
    <div className="account-details">
      <div className="left">
      <h1>  {t("account.account")}</h1>
      <button onClick={logout} className="log-out-btn">{t("account.log-out")}</button>
      <span>{t("account.orders")}</span>
      </div>
      <div className="right">
        <div className="details">
          <h4>{t("account-modal.details")}</h4>
          <div className="name">
            <span>
            {currentUser.name}
            </span>
            <span>
            {currentUser.surname}
            </span>
          </div>
          <div className="adress">
            {currentUser?.adress[0]}
          </div>
          <Link to='/adresses' className="view-addresses">{t("account.address")}({currentUser?.adress?.length})</Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Account;

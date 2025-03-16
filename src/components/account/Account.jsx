import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress, logoutUser } from "../../redux/accountSlice";
import { Link, useNavigate } from "react-router";
import BreamCrumb from '../Global/breadcrumb/BreamCrumb';


const Account = () => {
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
      <h1>Account</h1>
      <button onClick={logout} className="log-out-btn">Log out</button>
      <span>You haven't placed any orders yet.</span>
      </div>
      <div className="right">
        <div className="details">
          <h4>Account details</h4>
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
          <Link to='/adresses' className="view-addresses">View addresses ({currentUser?.adress?.length})</Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Account;

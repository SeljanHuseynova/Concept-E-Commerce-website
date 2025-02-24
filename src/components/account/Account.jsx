import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/accountSlice";
import { useNavigate } from "react-router";

const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <>
      <div>Account</div>
      <button onClick={logout}>LOG OUT</button>
    </>
  );
};

export default Account;

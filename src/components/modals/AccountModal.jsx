import React from "react";
import { useSelector } from "react-redux";
import NotLogged from "./NotLogged";
import LoggedInModal from "./LoggedInModal";

const AccountModal = ({closeModal}) => {
  const currentUser = useSelector((state) => state.users?.currentUser);
  return <div>{currentUser ? <LoggedInModal closeModal={closeModal}/> : <NotLogged closeModal={closeModal}/>}</div>;
};

export default AccountModal;

import { current } from "@reduxjs/toolkit";
import React, { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const AccountContext = createContext();

const AccountProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const currentUser = useSelector((state) => state.users.currentUser);
  useEffect(() => {
    if (currentUser) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [currentUser]);

  return (
    <AccountContext.Provider value={{ isLogged }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;

import React, { createContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const LanguageContext = createContext();
export const LanguageProvider = ({ children }) => {
  const { t, i18n } = useTranslation();
  const storedLanguage = localStorage.getItem("i18nextLng") || "en";
  const [language, setLanguage] = useState(storedLanguage);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang); // Ensure it's updated
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};


import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageProvider";

const GetInTouch = () => {
  const {t} = useContext(LanguageContext);
  return (
    <div className="get-in-touch">
      <h3>{t("contact.head-2")}</h3>
      <p>
      {t("contact.p-3")}
      </p>
      <div className="opening-hours">
        <h6>{t("contact.hours")}</h6>
        <div className="top">
          <span>{t("contact.span-1")}</span>
          <span>{t("contact.span-2")}</span>
        </div>
        <div className="bottom">
          <span>{t("contact.span-3")}</span>
          <span>{t("contact.span-4")}</span>
        </div>
      </div>
      <div className="heard-quarter">
        <h6>{t("contact.headquarter")}</h6>
        <div className="top">
          <span>{t("contact.span-5")}</span>
          <span>{t("contact.span-6")}</span>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;

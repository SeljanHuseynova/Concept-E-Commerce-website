import React, { useContext } from "react";
import { Link } from "react-router";
import { LanguageContext } from "../context/LanguageProvider";

const NotFoundPage = () => {
  const { t } = useContext(LanguageContext);
  return (
    <div className="not-found-page">
      <h5>404</h5>
      <p>{t("not-found")}</p>
      <Link to="/products" className="link">
        {t("cart.button")}
      </Link>
    </div>
  );
};

export default NotFoundPage;

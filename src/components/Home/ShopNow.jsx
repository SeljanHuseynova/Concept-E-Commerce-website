import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "../../context/LanguageProvider";
const ShopNow = () => {
  const {t} = useContext(LanguageContext);
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);
  return (
    <div className="shop-container">
      <div className="image-container">
        <img
          src="https://concept-theme.myshopify.com/cdn/shop/files/image-banner-1_8c625899-95b9-4a4c-8592-86d042a27db8.jpg?v=1704360855&width=2000"
          alt="Shop Banner"
          className="shop-image"
        />

        <div className="overlay">
          <div className="overlay-content">
            <p data-aos="fade-up">
              {t("home.shop")}
            </p>
            <Link to="/products" className="link" data-aos="zoom-in">
            {t("home.shop-now")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopNow;

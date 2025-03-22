import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";  // Make sure to import from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "../../context/LanguageProvider";

const OurCommunity = () => {
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="community">
      <div className="image-container" data-aos="fade-up">
        <img
          src="https://concept-theme.myshopify.com/cdn/shop/files/banner-beauty-1.jpg?v=1693971146&width=2000"
          alt="Shop Banner"
          className="shop-image"
          data-aos="zoom-in"
        />
        <div className="overlay" data-aos="fade-in" data-aos-delay="300">
          <div className="overlay-content">
            <h2>{t("about.community")}</h2>
            <p>{t("about.span")}</p>
            <Link to="/products" className="link" data-aos="fade-up" data-aos-delay="500">
              {t("about.button")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCommunity;

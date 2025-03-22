import React, { useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "../../context/LanguageProvider";

const OurMission = () => {
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="our-mission-container">
      <div 
        className="our-mission-section" 
        data-aos="fade-up"
      >
        <div className="image-container">
          <img 
            src="https://concept-theme.myshopify.com/cdn/shop/files/banner-beauty-5.jpg?v=1693971607&width=1070" 
            alt="Our Vision"
          />
        </div>
        <div className="text-container">
          <h3>{t("about.head-2")}</h3>
          <p>{t("about.vision")}</p>
        </div>
      </div>
      
      <div 
        className="our-mission-section" 
        data-aos="fade-up" 
        data-aos-delay="300"
      >
        <div className="image-container">
          <img 
            src="https://concept-theme.myshopify.com/cdn/shop/files/banner-beauty-6.jpg?v=1693971607&width=1070" 
            alt="Our Mission"
          />
        </div>
        <div className="text-container">
          <h3>{t("about.head-3")}</h3>
          <p>{t("about.mission")}</p>
        </div>
      </div>
    </div>
  );
};

export default OurMission;

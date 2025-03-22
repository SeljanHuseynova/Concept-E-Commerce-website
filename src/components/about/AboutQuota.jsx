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
    <div className="about-quota" data-aos="fade-up">
      <h5>{t("about.quote")}</h5>
      
      <div className="author-info" data-aos="fade-up" data-aos-delay="300">
        <img
          src="https://concept-theme.myshopify.com/cdn/shop/files/customer-reviews-1.png?crop=center&height=40&v=1669362849&width=40"
          alt="Annie Lee"
        />
        <span>{t("about.author")}</span>
      </div>
      
      <div className="rating" data-aos="fade-up" data-aos-delay="500">
        <span className="stars">★★★★★</span> 
        <span className="rate">{t("about.rate")}</span>
      </div>
    </div>
  );
};

export default OurMission;

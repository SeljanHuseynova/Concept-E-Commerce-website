import React, { useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "../../context/LanguageProvider";

const AboutWho = () => {
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="about-who-container">
      <div className="about-section" data-aos="fade-up">
        <div className="text-container" data-aos="fade-left">
          <h4>{t("about.head-4")}</h4>
          <p>
            {t("about.p-1")}
            <br />
            {t("about.p-2")}
          </p>
        </div>
        <div className="image-container" data-aos="fade-right">
          <img
            src="https://concept-theme.myshopify.com/cdn/shop/files/banner-beauty-3.jpg?v=1693971608&width=1070"
            alt="Who We Are"
          />
        </div>
      </div>

      <div className="about-section" data-aos="fade-up" data-aos-delay="300">
        <div className="text-container" data-aos="fade-left">
          <h4>{t("about.head-5")}</h4>
          <p>{t("about.p-3")}</p>
        </div>
        <div className="image-container" data-aos="fade-right">
          <img
            src="https://concept-theme.myshopify.com/cdn/shop/files/banner-beauty-4.jpg?v=1693971608&width=1070"
            alt="What We Do"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutWho;

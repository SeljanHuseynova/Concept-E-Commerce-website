import React, { useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import image from "../../assets/images/general/about-hero.webp";
import { LanguageContext } from "../../context/LanguageProvider";

const AboutHero = () => {
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="about-hero">
      <div 
        className="image" 
        style={{ backgroundImage: `url(${image})` }}
        data-aos="fade-up"
      ></div>
      <div className="bottom" data-aos="fade-up" data-aos-delay="300">
        <p>{t("about.p")}</p>
      </div>
    </div>
  );
};

export default AboutHero;

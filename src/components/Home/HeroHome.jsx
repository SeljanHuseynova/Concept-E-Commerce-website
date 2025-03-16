import React, { useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "../../context/LanguageProvider";

const HeroHome = () => {
  const {t} = useContext(LanguageContext);
  useEffect(() => {
    AOS.init({once:true});
  }, []);

  return (
    <>
    <div className="home-hero">
      <div className="content-container">
        <div className="content">
          <h2 data-aos="fade-up">{t("home.discover")}</h2>
          <button data-aos="fade-up" data-aos-delay="500">{t("home.our-make-up-products")}</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default HeroHome;
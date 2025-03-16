import React, { useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; 
import left from '../../assets/images/general/db-banner-1.jpg';
import right from '../../assets/images/general/db-banner-2.jpg';
import { Link } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageProvider";

const NimoSkincare = () => {
  const {t} = useContext(LanguageContext);
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-out-cubic",
      once: true,
      mirror: false, 
    });
  }, []);

  return (
    <div className="fluid-container" style={{ overflow: "hidden" }}>
      <div className="left" data-aos="fade-up">
        <img src={left} alt="skincare-photo" />
      </div>
      <div className="right" data-aos="fade-up">
        <img src={right} alt="skincare-photo" />
      </div>
      <div className="overlay" data-aos="zoom-in">
        <div className="overlay-content" data-aos="fade-up">
          <p>"{t("home.nimo.paragraph")}"</p>
          <Link to='/products' className='link' data-aos="fade-up">{t("home.nimo.button")}</Link>
        </div>
      </div>
    </div>
  );
};

export default NimoSkincare;

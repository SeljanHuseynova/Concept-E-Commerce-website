import React, { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageProvider';


const Ingredient = () => {
  const {t} = useContext(LanguageContext);
  return (
    <div className="marquee-container">
      <div className="marquee">
        <div className="marquee__items">
          {[...Array(10)].map((_, index) => (
            <span key={index} className="marquee__item">
              {index % 2 === 0 ? t("home.marquee.skin") : t("home.marquee.natural")}
            </span>
          ))}
        </div>
        <div className="marquee__items" aria-hidden="true">
          {[...Array(10)].map((_, index) => (
            <span key={index} className="marquee__item">
              {index % 2 === 0 ? t("home.marquee.skin") : t("home.marquee.natural")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ingredient;

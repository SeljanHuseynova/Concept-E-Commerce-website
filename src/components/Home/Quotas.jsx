import React, { useContext, useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { LanguageContext } from "../../context/LanguageProvider";

const Quotas = () => {
  const { t } = useContext(LanguageContext);
  const quotas = t("home.quotes", { returnObjects: true });

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuote = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quotas.length);
  };

  const prevQuote = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + quotas.length) % quotas.length
    );
  };

  return (
    <div className="quotas-carousel">
      <button className="arrow left" onClick={prevQuote}>
        <GoArrowLeft />
      </button>
      <div className="quote-content">
        <p className="quote">“{quotas[currentIndex].quote}”</p>
        <h3 className="brand">{quotas[currentIndex].brand}</h3>
      </div>
      <button className="arrow right" onClick={nextQuote}>
        <GoArrowRight />
      </button>
      <div className="indicators">
        {quotas.map((_, index) => (
          <span
            key={index}
            className={`btn ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Quotas;
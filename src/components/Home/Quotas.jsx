import React, { useState } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const Quotas = () => {
  const quotas = [
    {
      quota:
        
      "NIMO has a preternaturally cool reputation for stocking beauty's latest obsessions before everyone else does."
      ,
      brand: "ELLE",
    },
    {
      quota:
        "NIMO cosmetics are a game-changer! Top quality, gorgeous packaging.",
      brand: "FENTY",
    },
    {
      quota:
        "NIMO's eyeshadows are amazing. Rich colors, easy to blend, any look possible!",
      brand: "DOVINE",
    },
  ];

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
        <p className="quote">“{quotas[currentIndex].quota}”</p>
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
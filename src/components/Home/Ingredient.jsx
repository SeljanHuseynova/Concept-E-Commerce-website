import React from 'react';

const Ingredient = () => {
  return (
    <div className="marquee-container">
      <div className="marquee">
        <div className="marquee__items">
          {[...Array(10)].map((_, index) => (
            <span key={index} className="marquee__item">
              {index % 2 === 0 ? 'Sensitive Skin' : 'Natural Ingredient'}
            </span>
          ))}
        </div>
        <div className="marquee__items" aria-hidden="true">
          {[...Array(10)].map((_, index) => (
            <span key={index} className="marquee__item">
              {index % 2 === 0 ? 'Sensitive Skin' : 'Natural Ingredient'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ingredient;

import React, { useState, useEffect, useContext } from "react";
import image from "../../assets/images/general/homeSlide.jpg";
import { TfiArrowLeft, TfiArrowRight } from "react-icons/tfi";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "../../context/LanguageProvider";

const SpotLight = ({ products }) => {
  const {t} = useContext(LanguageContext);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const spotLightProducts = products.filter((item) =>
    [9, 10, 11].includes(item.id)
  );

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (spotLightProducts.length > 0) {
      setSelectedProduct(spotLightProducts[0]);
      setActiveIndex(0);
    }
  }, [products]);

  const handleButtonClick = (index) => {
    setSelectedProduct(spotLightProducts[index]);
    setActiveIndex(index);
  };

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % spotLightProducts.length;
    handleButtonClick(newIndex);
  };

  const handlePrev = () => {
    const newIndex =
      (activeIndex - 1 + spotLightProducts.length) % spotLightProducts.length;
    handleButtonClick(newIndex);
  };

  return (
    <div className="spot-light">
      <div className="title">
        <h2>{t("home.spotlight")}</h2>
      </div>
      <div className="main row">
        <div className="col-md-6">
          <div className="img" data-aos="fade-down">
            <img src={image} alt="Spotlight" />

            <div className="hotspots">
              {spotLightProducts.map((_, index) => (
                <div
                  key={index}
                  className={`hotspot ${activeIndex === index ? "active" : ""}`}
                  onClick={() => handleButtonClick(index)}
                  style={{
                    left: index === 0 ? "47%" : index === 1 ? "43%" : "37%",
                    top: index === 0 ? "14%" : index === 1 ? "24%" : "21%",
                  }}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="slide" data-aos="fade-down">
            {selectedProduct ? (
              <div className="spot-light-product">
                <div
                  className="bg-image"
                  style={{
                    backgroundImage: `url(${selectedProduct.images[0]})`,
                  }}
                ></div>
                <div className="info">
                  <div className="icon-container" onClick={handlePrev}>
                    <TfiArrowLeft className="icon" />
                  </div>
                  <div className="content">
                    <span>{selectedProduct.brand}</span>
                    <h4>{selectedProduct.name}</h4>
                    <p className="price">${selectedProduct.price}</p>
                  </div>
                  <div className="icon-container" onClick={handleNext}>
                    <TfiArrowRight className="icon" />
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading product...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotLight;

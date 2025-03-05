import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
const ShopNow = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);
  return (
    <div className="shop-container">
      <div className="image-container">
        <img
          src="https://concept-theme.myshopify.com/cdn/shop/files/image-banner-1_8c625899-95b9-4a4c-8592-86d042a27db8.jpg?v=1704360855&width=2000"
          alt="Shop Banner"
          className="shop-image"
        />

        <div className="overlay">
          <div className="overlay-content">
            <p data-aos="fade-up">
              “Explore our premium skincare and makeup products, meticulously
              crafted to enhance your natural features and elevate your
              confidence.”
            </p>
            <Link to="/products" className="link" data-aos="zoom-in">
              SHOP NOW
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopNow;

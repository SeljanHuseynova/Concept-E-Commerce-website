import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const HeroHome = () => {
  useEffect(() => {
    AOS.init({once:true});
  }, []);

  return (
    <>
    <div className="home-hero">
      <div className="content-container">
        <div className="content">
          <h2 data-aos="fade-up">Discover the Art of Cosmetics</h2>
          <button data-aos="fade-up" data-aos-delay="500">OUR MAKEUP PRODUCTS</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default HeroHome;
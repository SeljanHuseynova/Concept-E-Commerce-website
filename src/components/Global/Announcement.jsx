import React, { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../../context/LanguageProvider";
import AOS from "aos";
import "aos/dist/aos.css";

const Announcement = () => {
  const { t } = useContext(LanguageContext);
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);

  const info = [
    { text: t("nav.announcement1") },
    { text: t("nav.announcement2") },
    { text: t("nav.announcement3") },
  ];

  useEffect(() => {

    AOS.init();
  
    const interval = setInterval(() => {
      setCurrentInfoIndex((prevIndex) => (prevIndex + 1) % info.length);
    }, 4000); 

    return () => clearInterval(interval); 
  }, [info.length]);

  return (
    <div className="announcement">
      <span 
        className="info-text" 
        data-aos="fade-in"
        data-aos-duration="1000" 
        key={currentInfoIndex} 
      >
        {info[currentInfoIndex].text}
      </span>
    </div>
  );
};

export default Announcement;

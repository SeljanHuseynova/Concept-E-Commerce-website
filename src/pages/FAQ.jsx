import React, { useContext, useEffect } from "react";
import BreamCrumb from "../components/Global/breadcrumb/BreamCrumb";
import { AiFillMessage } from "react-icons/ai";
import { SiTinyletter } from "react-icons/si";
import FaqsAccordion from "../components/faq/FaqsAccordion";
import { LanguageContext } from "../context/LanguageProvider";
import AOS from "aos";
import "aos/dist/aos.css";

const FAQ = () => {
  const { t } = useContext(LanguageContext);
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="faq-container">
      <BreamCrumb />
      <h2 data-aos="fade-up">{t("faqs.head")}</h2>
      <div className="main">
        <div className="left" data-aos="fade-right">
          <div className="content" data-aos="fade-up">
            <h6>{t("faqs.head-2")}</h6>
            <p>{t("faqs.p")}</p>
            <span>{t("faqs.span")}</span>
          </div>
          <div className="contact-us" data-aos="fade-left">
            <div className="contact-faq" data-aos="zoom-in" data-aos-delay="200">
              <AiFillMessage className="icon" />
              <span>{t("faqs.message")}</span>
            </div>
            <div className="contact-faq" data-aos="zoom-in" data-aos-delay="300">
              <SiTinyletter className="icon" />
              <span>{t("faqs.contact")}</span>
            </div>
          </div>
        </div>
        <div className="right faqs" data-aos="fade-up">
          <FaqsAccordion />
        </div>
      </div>
    </div>
  );
};

export default FAQ;

import React, { useContext } from "react";
import BreamCrumb from "../components/Global/breadcrumb/BreamCrumb";
import { AiFillMessage } from "react-icons/ai";
import { SiTinyletter } from "react-icons/si";
import FaqsAccordion from "../components/faq/FaqsAccordion";
import { LanguageContext } from "../context/LanguageProvider";

const FAQ = () => {
  const {t} = useContext(LanguageContext);
  return (
    <div className="faq-container">
      <BreamCrumb />
      <h2>{t("faqs.head")}</h2>
      <div className="main">
        <div className="left">
          <div className="content">
            <h6>{t("faqs.head-2")}</h6>
            <p>
            {t("faqs.p")}
            </p>
            <span>{t("faqs.span")}</span>
          </div>
          <div className="contact-us">
            <div className="contact-faq">
              <AiFillMessage className="icon" />
              <span>{t("faqs.message")}</span>
            </div>
            <div className="contact-faq">
              <SiTinyletter className="icon" />
              <span>{t("faqs.contact")}</span>
            </div>
          </div>
        </div>
        <div className="right faqs">
          <FaqsAccordion/>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

import React, { useContext, useEffect } from "react";
import Map from "../components/contact/Map";
import Breadcrumb from "../components/Global/breadcrumb/BreamCrumb";
import ContactForm from "../components/contact/ContactForm";
import GetInTouch from "../components/contact/GetInTouch";
import { LanguageContext } from "../context/LanguageProvider";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="contact">
      <Map data-aos="fade-up" />
      <div className="bottom">
        <Breadcrumb data-aos="fade-up" />
        <div className="contact-title" data-aos="fade-up">
          <h1>{t("contact.head")}</h1>
          <p>
            {t("contact.first-p")}
            <br />
            {t("contact.second-p")}
          </p>
        </div>
        <div className="contact-part">
          <div className="left" data-aos="fade-right">
            <ContactForm />
          </div>
          <div className="right" data-aos="fade-left">
            <GetInTouch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

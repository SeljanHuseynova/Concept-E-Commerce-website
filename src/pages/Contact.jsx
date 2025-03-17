import React, { useContext } from "react";
import Map from "../components/contact/Map";
import Breadcrumb from "../components/Global/breadcrumb/BreamCrumb";
import ContactForm from "../components/contact/ContactForm";
import GetInTouch from "../components/contact/GetInTouch";
import { LanguageContext } from "../context/LanguageProvider";

const Contact = () => {
  const {t} = useContext(LanguageContext);
  return (
    <div className="contact">
      <Map />
      <div className="bottom">
        <Breadcrumb />
        <div className="contact-title">
          <h1> {t("contact.head")}</h1>
          <p>
           {t("contact.first-p")}
            <br />
            {t("contact.second-p")}
          </p>
        </div>
        <div className="contact-part">
          <div className="left">
            <ContactForm />
          </div>
          <div className="right">
            <GetInTouch/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

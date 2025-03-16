import React from "react";
import Map from "../components/contact/Map";
import Breadcrumb from "../components/Global/breadcrumb/BreamCrumb";
import ContactForm from "../components/contact/ContactForm";
import GetInTouch from "../components/contact/GetInTouch";

const Contact = () => {
  return (
    <div className="contact">
      <Map />
      <div className="bottom">
        <Breadcrumb />
        <div className="contact-title">
          <h1>Contact</h1>
          <p>
            We're happy to answer questions or help you with returns.
            <br />
            Please fill out the form below if you need assistance.
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

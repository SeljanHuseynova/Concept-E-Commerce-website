import React from "react";
import BreamCrumb from "../components/Global/breadcrumb/BreamCrumb";
import { Link } from "react-router";
import { AiFillMessage } from "react-icons/ai";
import { SiTinyletter } from "react-icons/si";
import FaqsAccordion from "../components/faq/FaqsAccordion";

const FAQ = () => {
  return (
    <div className="faq-container">
      <BreamCrumb />
      <h2>Theme FAQs</h2>
      <div className="main">
        <div className="left">
          <div className="content">
            <h6>Need help?</h6>
            <p>
              Below FAQ are some common concerns of our clients before
              purchasing the theme. If you have other questions, please just
              send it to:
            </p>
            <span>seljan_huseynova@unec.edu.az</span>
          </div>
          <div className="contact-us">
            <div className="contact">
              <AiFillMessage className="icon" />
              <span>Message Us</span>
            </div>
            <div className="contact">
              <SiTinyletter className="icon" />
              <span>Contact Us</span>
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

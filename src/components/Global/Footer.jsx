import React, { useContext, useRef } from "react";
import { FaFacebookSquare, FaInstagram, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { LanguageContext } from "../../context/LanguageProvider";

const Footer = () => {
  const {t} = useContext(LanguageContext);
  const emailRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    if (email.trim() === "") return;

    Swal.fire({
      title: "Success!",
      text: "Your email was sent successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });

    emailRef.current.value = "";
  };

  return (
    <footer>
      <div className="top">
        <div className="left">
          <h2>
            {t("footer.left")}
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              ref={emailRef}
              required
            />
            <button type="submit">
              <IoMdArrowForward />
            </button>
          </form>
        </div>
        <div className="right">
          <div className="left">
            <h6> {t("footer.shop")}</h6>
            <Link to="/products" className="link">
            {t("footer.skincare")}
            </Link>
            <Link to="/products" className="link">
            {t("footer.makeup")}
            </Link>
            <Link to="/products" className="link">
            {t("footer.beauty")}
            </Link>
            <Link to="/products" className="link">
            {t("footer.products")}
            </Link>
            <Link to="/products" className="link">
            {t("footer.routine")}
            </Link>
          </div>
          <div className="right-part">
            <h6>{t("footer.about-head")}</h6>
            <Link to="/about" className="link">
            {t("footer.about-us")}
            </Link>
            <Link to="/contact" className="link">
            {t("footer.contact-us")}
            </Link>
            <Link to="/blog" className="link">
            {t("footer.blog")}
            </Link>
          </div>
        </div>
      </div>
      <div className="middle">
        <div className="icons">
          <a href="https://www.facebook.com">
            <FaFacebookSquare className="icon"/>
          </a>
          <a href="https://twitter.com">
            <FaXTwitter className="icon"/>
          </a>
          <a href="https://www.instagram.com">
            <FaInstagram className="icon"/>
          </a>
          <a href="https://www.pinterest.com">
            <FaPinterest className="icon"/>
          </a>
        </div>
      </div>
      <div className="bottom">
        <span className="left">© 2024 Concept. All rights reserved.</span>
        <div className="right">
          <a href="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect">
          {t("footer.refund")}</a>
          <a href="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect">
          {t("footer.privacy")}</a>
          <a href="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect">
          {t("footer.terms")}</a>
          <a href="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect">
          {t("footer.shipping")}</a>
         <a href="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect">
         {t("footer.contact")}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

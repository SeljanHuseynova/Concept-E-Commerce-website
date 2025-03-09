import React, { useRef } from "react";
import { FaFacebookSquare, FaInstagram, FaPinterest } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoMdArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Footer = () => {
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
            Sign up for 10% off your first order and discover the best new
            beauty first.
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
            <h6>SHOP</h6>
            <Link to="/products" className="link">
              Skincare
            </Link>
            <Link to="/products" className="link">
              Makeup
            </Link>
            <Link to="/products" className="link">
              Beauty Tips
            </Link>
            <Link to="/products" className="link">
              Products
            </Link>
            <Link to="/products" className="link">
              Routine
            </Link>
          </div>
          <div className="right-part">
            <h6>ABOUT</h6>
            <Link to="/about" className="link">
              About us
            </Link>
            <Link to="/contact" className="link">
              Contact us
            </Link>
            <Link to="/blog" className="link">
              Blog
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
          Refund Policy</a>
          <a href="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect">
          Privacy Policy</a>
          <a href="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect">
          Terms of service</a>
          <a href="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect">
         Shipping Policy</a>
         <a href="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect">
       Contact Information</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

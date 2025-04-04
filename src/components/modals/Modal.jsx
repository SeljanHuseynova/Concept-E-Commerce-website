import React, { useEffect, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import CartModal from "./CartModal";
import AccountModal from "./AccountModal";
import WishListModal from "./WishListModal";
import SearchModal from "./SearchModal";
import FilterModal from "./FilterModal";
import AOS from "aos";
import "aos/dist/aos.css";

const Modal = ({ closeModal, modalType }) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    AOS.init();
    document.documentElement.style.overflow = "hidden";
    const nav = document.querySelector("nav");
    const handleScroll = () => {
      if (window.scrollY > 50) {
        if (nav) nav.style.display = "none";
      } else {
        if (nav) nav.style.display = "";
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      document.documentElement.style.overflow = "";
      if (nav) nav.style.display = "";
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const renderModalContent = () => {
    switch (modalType) {
      case "cart":
        return <CartModal closeModal={closeModal} />;
      case "wishlist":
        return <WishListModal closeModal={closeModal} />;
      case "account":
        return <AccountModal closeModal={closeModal} />;
      case "search":
        return <SearchModal closeModal={closeModal} />;
      case "filter":
        return <FilterModal />;
      default:
        return null;
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeModal();
    }, 300); // Match this time with the animation duration
  };

  return (
    <div
      className={`modal-overlay ${isClosing ? "closing" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`modal-content ${isClosing ? "closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
        data-aos="fade-left"
      >
        <div className="icon-container" onClick={handleClose}>
          <TfiClose className="cls-icon" />
        </div>
        {renderModalContent()}
      </div>
    </div>
  );
};

export default Modal;

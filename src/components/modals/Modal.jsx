import React, { useEffect } from "react";
import { TfiClose } from "react-icons/tfi";
import CartModal from "./CartModal";
import AccountModal from "./AccountModal";
import WishListModal from "./WishListModal";
import SearchModal from "./SearchModal";
import FilterModal from "./FilterModal";
const Modal = ({ closeModal, modalType }) => {
  useEffect(() => {
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
        return <CartModal closeModal={closeModal}/>;
      case "wishlist":
        return <WishListModal />;
      case "account":
        return <AccountModal />;
      case "search":
        return <SearchModal closeModal={closeModal}/>;
      case "filter":
        return <FilterModal />;
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="icon-container" onClick={closeModal}>
          <TfiClose className="cls-icon" />
        </div>
        {renderModalContent()}
      </div>
    </div>
  );
};

export default Modal;

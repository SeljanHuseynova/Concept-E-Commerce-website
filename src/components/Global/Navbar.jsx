import React, { useEffect, useState } from "react";
import {
  IoBagOutline,
  IoHeartOutline,
  IoPersonOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo/concept.logo.png";
import { LuMenu } from "react-icons/lu";
import Modal from "../modals/Modal";

const Navbar = () => {
  const [modalType, setModalType] = useState(null);
  const [isSticky, setIsSticky] = useState(false);

  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg pt-2 pt-sm-3 pb-2 pb-sm-3 pb-lg-4 ${
          isSticky ? "sticky" : ""
        }`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="concept-logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <LuMenu className="toggle-icon" />
          </button>

          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                MENU
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav flex-grow-1 justify-content-center">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Pages
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Blog
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Icons Section */}
          <div className="icons d-flex align-items-center ms-auto">
            <IoSearchOutline className="icon" onClick={() => openModal("search")} />
            <IoPersonOutline className="icon" onClick={() => openModal("account")} />
            <IoHeartOutline className="icon" onClick={() => openModal("wishlist")} />
            <IoBagOutline className="icon" onClick={() => openModal("cart")} />
          </div>
        </div>
      </nav>

      {/* Modal */}
      {modalType && <Modal closeModal={closeModal} modalType={modalType} />}
    </>
  );
};

export default Navbar;

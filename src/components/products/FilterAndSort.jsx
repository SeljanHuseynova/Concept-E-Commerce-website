import React, { useState, useRef, useEffect } from "react";
import { GoChevronDown } from "react-icons/go";
import { useDispatch } from "react-redux";
import Modal from "../modals/Modal";
import {
  setAvailability,
  setBrand,
  setCategory,
  setSubCategory,
  resetFilter,
  setSort,
} from "../../redux/productsSlice";
import { IoIosColorFilter } from "react-icons/io";
const FilterAndSort = ({ products }) => {
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(null);
  const filterRef = useRef(null);
  const toggleFilter = (filter) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setOpenFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [modalType, setModalType] = useState(null);
  const openModal = (type) => {
    setModalType(type);
  };
  const closeModal = () => {
    setModalType(null);
  };
  return (
    <div className="filter-sort-container" ref={filterRef}>
      <div
        className="mobile-filter-container"
        onClick={() => openModal("filter")}
      >
        <IoIosColorFilter className="icon" />
        <span>FILTER</span>
      </div>
      <div className="filter-container">
        <div className="filter" onClick={() => toggleFilter("availability")}>
          <span>Availability</span>
          <GoChevronDown className="icon" />
          <div
            className={`filter-div ${
              openFilter === "availability" ? "open" : ""
            }`}
          >
            <span onClick={() => dispatch(setAvailability("inStock"))}>
              In Stock
            </span>
            <span onClick={() => dispatch(setAvailability("outOfStock"))}>
              Out Of Stock
            </span>
            <span
              className="reset"
              onClick={() => dispatch(resetFilter("availability"))}
            >
              Reset
            </span>
          </div>
        </div>

        <div className="filter" onClick={() => toggleFilter("brand")}>
          <span>Brand</span>
          <GoChevronDown className="icon" />
          <div className={`filter-div ${openFilter === "brand" ? "open" : ""}`}>
            {[
              "LAORIV",
              "FURTUNA",
              "IRIS HANTVERK",
              "FENTY BEAUTY",
              "RARE BEAUTY",
              "KOSAS",
            ].map((brand) => (
              <span key={brand} onClick={() => dispatch(setBrand(brand))}>
                {brand}
              </span>
            ))}
            <span
              className="reset"
              onClick={() => dispatch(resetFilter("brand"))}
            >
              Reset
            </span>
          </div>
        </div>

        <div className="filter" onClick={() => toggleFilter("category")}>
          <span>Product Type</span>
          <GoChevronDown className="icon" />
          <div
            className={`filter-div ${openFilter === "category" ? "open" : ""}`}
          >
            <span onClick={() => dispatch(setCategory("skincare"))}>
              Skincare
            </span>
            <span onClick={() => dispatch(setCategory("makeup"))}>Makeup</span>
            <span
              className="reset"
              onClick={() => dispatch(resetFilter("category"))}
            >
              Reset
            </span>
          </div>
        </div>

        <div className="filter" onClick={() => toggleFilter("subCategory")}>
          <span>Product</span>
          <GoChevronDown className="icon" />
          <div
            className={`filter-div ${
              openFilter === "subCategory" ? "open" : ""
            }`}
          >
            {[
              "serum",
              "cream",
              "lotion",
              "gloss",
              "blush",
              "mascara",
              "shampoo",
            ].map((product) => (
              <span
                key={product}
                onClick={() => dispatch(setSubCategory(product))}
              >
                {product}
              </span>
            ))}
            <span
              className="reset"
              onClick={() => dispatch(resetFilter("subCategory"))}
            >
              Reset
            </span>
          </div>
        </div>
      </div>
      <div className="sort-container" onClick={() => toggleFilter("sort")}>
        <span className="number-products">{products.length} products</span>
        <span>SORT</span>
        <GoChevronDown className="icon" />
        <div className={`sort-div ${openFilter === "sort" ? "open" : ""}`}>
          <span onClick={() => dispatch(setSort("nameAsc"))}>
            Alphabetically, A-Z
          </span>
          <span onClick={() => dispatch(setSort("nameDesc"))}>
            Alphabetically, Z-A
          </span>
          <span onClick={() => dispatch(setSort("priceAsc"))}>
            Price, low to high
          </span>
          <span onClick={() => dispatch(setSort("priceDesc"))}>
            Price, high to low
          </span>
          <span onClick={() => dispatch(setSort("dateAsc"))}>
            Date, old to new
          </span>
          <span onClick={() => dispatch(setSort("dateDesc"))}>
            Date, new to old
          </span>
        </div>
      </div>
      {modalType && <Modal closeModal={closeModal} modalType={modalType} />}
    </div>
  );
};

export default FilterAndSort;

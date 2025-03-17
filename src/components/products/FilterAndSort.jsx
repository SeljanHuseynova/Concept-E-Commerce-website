import React, { useState, useRef, useEffect, useContext } from "react";
import { GoChevronDown } from "react-icons/go";
import { useDispatch } from "react-redux";
import Modal from "../modals/Modal";
import Sort from "./Sort";
import {
  setAvailability,
  setBrand,
  setCategory,
  setSubCategory,
  resetFilter,
} from "../../redux/productsSlice";
import { IoIosColorFilter } from "react-icons/io";
import { LanguageContext } from "../../context/LanguageProvider";

const FilterAndSort = ({ products }) => {
  const { t } = useContext(LanguageContext);
  const [selectedFilters, setSelectedFilters] = useState({
    availability: null,
    brand: null,
    category: null,
    subCategory: null,
  });
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(null);
  const filterRef = useRef(null);

  const toggleFilter = (filter) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  const handleSelect = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    if (filterType === "availability") dispatch(setAvailability(value));
    if (filterType === "brand") dispatch(setBrand(value));
    if (filterType === "category") dispatch(setCategory(value));
    if (filterType === "subCategory") dispatch(setSubCategory(value));
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
        <span>{t("products.filter")}</span>
      </div>
      <div className="filter-container">
        {[
          {
            key: "availability",
            options: ["In Stock", "Out Of Stock"],
            label: "availability",
          },
          {
            key: "brand",
            options: [
              "LAORIV",
              "FURTUNA",
              "IRIS HANTVERK",
              "FENTY BEAUTY",
              "RARE BEAUTY",
              "KOSAS",
            ],
            label: "brand",
          },
          {
            key: "category",
            options: ["skincare", "makeup"],
            label: "product-type",
          },
          {
            key: "subCategory",
            options: [
              "serum",
              "cream",
              "lotion",
              "gloss",
              "blush",
              "mascara",
              "shampoo",
            ],
            label: "product",
          },
        ].map(({ key, options, label }) => (
          <div className="filter" key={key} onClick={() => toggleFilter(key)}>
            <span>{t(`products.${label}`)}</span>
            <GoChevronDown className="icon" />
            <div className={`filter-div ${openFilter === key ? "open" : ""}`}>
              {options.map((option) => (
                <span
                  key={option}
                  className={selectedFilters[key] === option ? "selected" : ""}
                  onClick={() => handleSelect(key, option)}
                >
                  {option}
                </span>
              ))}
              <span className="reset" onClick={() => handleSelect(key, null)}>
                {t("products.reset")}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Sort
        toggleFilter={toggleFilter}
        products={products}
        openFilter={openFilter}
      />
      {modalType && <Modal closeModal={closeModal} modalType={modalType} />}
    </div>
  );
};

export default FilterAndSort;

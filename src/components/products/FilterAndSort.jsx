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
} from "../../redux/productsSlice";
import { IoIosColorFilter } from "react-icons/io";
import Sort from "./Sort";
const FilterAndSort = ({ products }) => {
  const dispatch = useDispatch();
  const [openFilter, setOpenFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    availability: null,
    brand: null,
    category: null,
    subCategory: null,
  });
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
  const handleReset = (filterType) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: null,
    }));
    dispatch(resetFilter(filterType));
  };
  return (
    <div className="filter-sort-container" ref={filterRef}>
      <div
        className="mobile-filter-container"
        onClick={() => setOpenFilter("filter")}
      >
        <IoIosColorFilter className="icon" />
        <span>FILTER</span>
      </div>

      <div className="filter-container">
        {[
          {
            type: "availability",
            label: "Availability",
            options: ["In Stock", "Out Of Stock"],
          },
          {
            type: "brand",
            label: "Brand",
            options: [
              "LAORIV",
              "FURTUNA",
              "IRIS HANTVERK",
              "FENTY BEAUTY",
              "RARE BEAUTY",
              "KOSAS",
            ],
          },
          {
            type: "category",
            label: "Product Type",
            options: ["Skincare", "Makeup"],
          },
          {
            type: "subCategory",
            label: "Product",
            options: ["serum", "cream", "lotion", "gloss", "blush", "mascara", "shampoo"],
          },
        ].map(({ type, label, options }) => (
          <div key={type} className="filter" onClick={() => toggleFilter(type)}>
            <span>{label}</span>
            <GoChevronDown className="icon" />
            <div
              className={`filter-div ${openFilter === type ? "open" : ""}`}
            >
              {options.map((option) => (
                <span
                  key={option}
                  className={selectedFilters[type] === option ? "selected" : ""}
                  onClick={() => handleSelect(type, option)}
                >
                  {option}
                </span>
              ))}
              <span
                className="reset"
                onClick={() => handleReset(type)}
              >
                Reset
              </span>
            </div>
          </div>
        ))}
      </div>
     <Sort toggleFilter={toggleFilter} products={products} openFilter={openFilter}/>
    </div>
  );
};
export default FilterAndSort;

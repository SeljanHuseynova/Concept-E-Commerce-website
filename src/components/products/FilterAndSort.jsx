import React from "react";
import { GoChevronDown } from "react-icons/go";
import { useDispatch } from "react-redux";
import { setAvailability, setBrand, setCategory, setSubCategory } from "../../redux/productsSlice";

const FilterAndSort = () => {
  const dispatch = useDispatch();

  return (
    <div className="filter-sort-container">
      <div className="filter-container">
        <div className="filter" onClick={() => dispatch(setAvailability("inStock"))}>
          <span>Availability</span>
          <GoChevronDown className="icon" />
          <div className="filter-div">
            <span onClick={() => dispatch(setAvailability("inStock"))}>In Stock</span>
            <span onClick={() => dispatch(setAvailability("outOfStock"))}>Out Of Stock</span>
          </div>
        </div>

        <div className="filter">
          <span>Brand</span>
          <GoChevronDown className="icon" />
          <div className="filter-div">
            {["LAORIV", "FURTUNA", "IRIS HANTVERK", "FENTY BEAUTY", "RARE BEAUTY", "KOSAS"].map(
              (brand) => (
                <span key={brand} onClick={() => dispatch(setBrand(brand))}>
                  {brand}
                </span>
              )
            )}
          </div>
        </div>

        <div className="filter">
          <span>Product Type</span>
          <GoChevronDown className="icon" />
          <div className="filter-div">
            <span onClick={() => dispatch(setCategory("skincare"))}>Skincare</span>
            <span onClick={() => dispatch(setCategory("makeup"))}>Makeup</span>
          </div>
        </div>

        <div className="filter">
          <span>Product</span>
          <GoChevronDown className="icon" />
          <div className="filter-div">
            {["serum", "cream", "lotion", "gloss", "blush", "mascara", "shampoo"].map((product) => (
              <span key={product} onClick={() => dispatch(setSubCategory(product))}>
                {product}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="sort-container">
        <span>SORT BY</span>
        <GoChevronDown className="icon" />
      </div>
    </div>
  );
};

export default FilterAndSort;

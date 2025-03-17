import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setCategory } from "../../../redux/productsSlice";

const ProductTypeModal = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelect = (category) => {
    setSelectedCategory(category);
    dispatch(setCategory(category));
  };

  return (
    <div className="mobile-filter">
      <h4>Filter by Product Type</h4>
      <div className="main">
        <span
          className={selectedCategory === "skincare" ? "selected" : ""}
          onClick={() => handleSelect("skincare")}
        >
          Skincare
        </span>
        <span
          className={selectedCategory === "makeup" ? "selected" : ""}
          onClick={() => handleSelect("makeup")}
        >
          Makeup
        </span>
        <span
          className="reset"
          onClick={() => {
            setSelectedCategory(null);
            dispatch(resetFilter("category"));
          }}
        >
          Reset
        </span>
      </div>
    </div>
  );
};

export default ProductTypeModal;

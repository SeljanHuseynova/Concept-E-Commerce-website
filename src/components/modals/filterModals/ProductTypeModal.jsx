import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setCategory } from "../../../redux/productsSlice";

const ProductTypeModal = () => {
  const dispatch = useDispatch();
  return (
    <div className="mobile-filter">
      <h4>Filter by Product Type</h4>
      <div className="main">
      <span onClick={() => dispatch(setCategory("skincare"))}>Skincare</span>
      <span onClick={() => dispatch(setCategory("makeup"))}>Makeup</span>
      <span className="reset" onClick={() => dispatch(resetFilter("category"))}>
        Reset
      </span>
      </div>
    </div>
  );
};

export default ProductTypeModal;

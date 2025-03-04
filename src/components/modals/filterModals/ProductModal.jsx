import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setSubCategory } from "../../../redux/productsSlice";

const products = ["serum", "cream", "lotion", "gloss", "blush", "mascara", "shampoo"];

const ProductModal = () => {
  const dispatch = useDispatch();
  return (
    <div className="mobile-filter">
      <h4>Filter by Product</h4>
      <div className="main">
      {products.map((product) => (
        <span key={product} onClick={() => dispatch(setSubCategory(product))}>
          {product}
        </span>
      ))}
      <span className="reset" onClick={() => dispatch(resetFilter("subCategory"))}>
        Reset
      </span>
      </div>
    </div>
  );
};

export default ProductModal;

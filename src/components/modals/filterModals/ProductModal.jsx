import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setSubCategory } from "../../../redux/productsSlice";

const products = ["serum", "cream", "lotion", "gloss", "blush", "mascara", "shampoo"];

const ProductModal = () => {
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelect = (product) => {
    setSelectedProduct(product);
    dispatch(setSubCategory(product));
  };

  return (
    <div className="mobile-filter">
      <h4>Filter by Product</h4>
      <div className="main">
        {products.map((product) => (
          <span
            key={product}
            className={selectedProduct === product ? "selected" : ""}
            onClick={() => handleSelect(product)}
          >
            {product}
          </span>
        ))}
        <span
          className="reset"
          onClick={() => {
            setSelectedProduct(null);
            dispatch(resetFilter("subCategory"));
          }}
        >
          Reset
        </span>
      </div>
    </div>
  );
};

export default ProductModal;

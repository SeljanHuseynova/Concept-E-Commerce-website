import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setBrand } from "../../../redux/productsSlice";

const brands = [
  "LAORIV",
  "FURTUNA",
  "IRIS HANTVERK",
  "FENTY BEAUTY",
  "RARE BEAUTY",
  "KOSAS",
];

const BrandModal = () => {
  const dispatch = useDispatch();
  return (
    <div className="mobile-filter">
      <h4>Filter by Brand</h4>
      <div className="main">
      {brands.map((brand) => (
        <span key={brand} onClick={() => dispatch(setBrand(brand))}>
          {brand}
        </span>
      ))}
      <span className="reset" onClick={() => dispatch(resetFilter("brand"))}>
        Reset
      </span>
      </div>
    </div>
  );
};

export default BrandModal;

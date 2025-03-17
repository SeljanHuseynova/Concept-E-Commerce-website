import React, { useState } from "react";
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
  const [selectedBrand, setSelectedBrand] = useState(null);

  const handleSelect = (brand) => {
    setSelectedBrand(brand);
    dispatch(setBrand(brand));
  };

  return (
    <div className="mobile-filter">
      <h4>Filter by Brand</h4>
      <div className="main">
        {brands.map((brand) => (
          <span
            key={brand}
            className={selectedBrand === brand ? "selected" : ""}
            onClick={() => handleSelect(brand)}
          >
            {brand}
          </span>
        ))}
        <span
          className="reset"
          onClick={() => {
            setSelectedBrand(null);
            dispatch(resetFilter("brand"));
          }}
        >
          Reset
        </span>
      </div>
    </div>
  );
};

export default BrandModal;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setAvailability } from "../../../redux/productsSlice";

const AvailabilityModal = () => {
  const dispatch = useDispatch();
  const [selectedAvailability, setSelectedAvailability] = useState(null);

  const handleSelect = (value) => {
    setSelectedAvailability(value);
    dispatch(setAvailability(value));
  };

  return (
    <div className="mobile-filter">
      <h4>Filter by Availability</h4>
      <div className="main">
        <span
          className={selectedAvailability === "inStock" ? "selected" : ""}
          onClick={() => handleSelect("inStock")}
        >
          In Stock
        </span>
        <span
          className={selectedAvailability === "outOfStock" ? "selected" : ""}
          onClick={() => handleSelect("outOfStock")}
        >
          Out Of Stock
        </span>
        <span
          className="reset"
          onClick={() => {
            setSelectedAvailability(null);
            dispatch(resetFilter("availability"));
          }}
        >
          Reset
        </span>
      </div>
    </div>
  );
};

export default AvailabilityModal;
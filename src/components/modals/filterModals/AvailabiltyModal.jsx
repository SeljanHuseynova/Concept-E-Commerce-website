import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setAvailability } from "../../../redux/productsSlice";

const AvailabilityModal = () => {
  const dispatch = useDispatch();
  return (
    <div className="mobile-filter">
      <h4>Filter by Availability</h4>
      <div className="main">
      <span onClick={() => dispatch(setAvailability("inStock"))}>In Stock</span>
      <span onClick={() => dispatch(setAvailability("outOfStock"))}>
        Out Of Stock
      </span>
      <span
        className="reset"
        onClick={() => dispatch(resetFilter("availability"))}
      >
        Reset
      </span>
      </div>
    </div>
  );
};

export default AvailabilityModal;

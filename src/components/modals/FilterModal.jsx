import React, { useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import ProductTypeModal from "./filterModals/ProductTypeModal";
import ProductModal from "./filterModals/ProductModal";
import AvailabilityModal from "./filterModals/AvailabiltyModal";
import BrandModal from "./filterModals/BrandModal";
import { useDispatch } from "react-redux";
import { resetAllFilters } from "../../redux/productsSlice";

const FilterModal = () => {
  const dispatch = useDispatch();
  const [modalType, setModalType] = useState(null);

  const openModal = (type) => {
    setModalType(type);
  };

  return (
    <div className="filter-modal">
      <div className="top">
        <h4>Filter Products</h4>
      </div>
      <div className="filter-container-mobile">
        {[
          { key: "availability", label: "Availability" },
          { key: "brand", label: "Brand" },
          { key: "productType", label: "Product Type" },
          { key: "product", label: "Product" },
        ].map(({ key, label }) => (
          <div className="filter" key={key} onClick={() => openModal(key)}>
            <span>{label}</span>
            <IoIosArrowRoundForward className="icon" />
          </div>
        ))}
      </div>
      <div className="bottom">
        <button onClick={() => dispatch(resetAllFilters())} className="clear-filter">
          Clear All
        </button>
      </div>

      {modalType === "availability" && <AvailabilityModal closeModal={() => setModalType(null)} />}
      {modalType === "brand" && <BrandModal closeModal={() => setModalType(null)} />}
      {modalType === "productType" && <ProductTypeModal closeModal={() => setModalType(null)} />}
      {modalType === "product" && <ProductModal closeModal={() => setModalType(null)} />}
    </div>
  );
};

export default FilterModal;
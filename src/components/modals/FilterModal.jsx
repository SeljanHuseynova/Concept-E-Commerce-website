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
        <div className="filter" onClick={() => openModal("availability")}>
          <span>Availability</span>
          <IoIosArrowRoundForward className="icon" />
        </div>

        <div className="filter" onClick={() => openModal("brand")}>
          <span>Brand</span>
          <IoIosArrowRoundForward className="icon" />
        </div>

        <div className="filter" onClick={() => openModal("productType")}>
          <span>Product Type</span>
          <IoIosArrowRoundForward className="icon" />
        </div>

        <div className="filter" onClick={() => openModal("product")}>
          <span>Product</span>
          <IoIosArrowRoundForward className="icon" />
        </div>
      </div>
      <div className="bottom">
        <button onClick={() => dispatch(resetAllFilters())} className="clear-filter">Clear All</button>
      </div>

      {modalType && (
        <>
          {modalType === "availability" && <AvailabilityModal />}
          {modalType === "brand" && <BrandModal />}
          {modalType === "productType" && <ProductTypeModal />}
          {modalType === "product" && <ProductModal />}
        </>
      )}
    </div>
  );
};

export default FilterModal;

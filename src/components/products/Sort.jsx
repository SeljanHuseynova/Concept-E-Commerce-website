import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../../redux/productsSlice';
import { GoChevronDown } from 'react-icons/go';
import { LanguageContext } from '../../context/LanguageProvider';

const Sort = ({ toggleFilter, products, openFilter }) => {
  const {t} = useContext(LanguageContext);
  const dispatch = useDispatch();
  const [selectedSort, setSelectedSort] = useState(null);

  const handleSort = (sortType) => {
    setSelectedSort(sortType);
    dispatch(setSort(sortType));
  };

  return (
    <div className="sort-container" onClick={() => toggleFilter("sort")}>
      <span className="number-products">{products.length}  {t("products.products")}</span>
      <span> {t("products.sort")}</span>
      <GoChevronDown className="icon" />
      <div className={`sort-div ${openFilter === "sort" ? "open" : ""}`}>
        {[
          { label: "Alphabetically, A-Z", value: "nameAsc" },
          { label: "Alphabetically, Z-A", value: "nameDesc" },
          { label: "Price, low to high", value: "priceAsc" },
          { label: "Price, high to low", value: "priceDesc" },
          { label: "Date, old to new", value: "dateAsc" },
          { label: "Date, new to old", value: "dateDesc" },
        ].map(({ label, value }) => (
          <span
            key={value}
            className={selectedSort === value ? "selected" : ""}
            onClick={() => handleSort(value)}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Sort;

import React, { useEffect } from "react";
import BreamCrumb from "../components/Global/breadcrumb/BreamCrumb";
import FilterAndSort from "../components/products/FilterAndSort";
import AllProducts from "../components/products/AllProducts";
import { useSelector, useDispatch } from "react-redux";
import { resetAllFilters } from "../redux/productsSlice";


const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.products?.filteredProducts);

  useEffect(() => {
    dispatch(resetAllFilters());
  }, [dispatch]);

  return (
    <>
      <BreamCrumb />
      <FilterAndSort products={products} />
      <AllProducts products={products} />
    </>
  );
};

export default Products;

import React from "react";
import BreamCrumb from "../components/Global/breadcrumb/BreamCrumb";
import FilterAndSort from "../components/products/FilterAndSort";
import AllProducts from "../components/products/AllProducts";

const Products = ({products}) => {
  return (
    <>
      <BreamCrumb />
      <FilterAndSort products={products}/>
      <AllProducts products={products}/>
    </>
  );
};

export default Products;

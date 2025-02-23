import React from "react";
import HeroHome from "../components/Home/HeroHome";
import NewArrivals from "../components/Home/NewArrivals";
import SpotLight from "../components/Home/SpotLight";

const Home = ({products}) => {
  // console.log(products)
  return (
    <>
      <HeroHome />
      <NewArrivals products={products}/>
      <SpotLight products={products}/>

    </>
  );
};

export default Home;

import React from "react";
import HeroHome from "../components/Home/HeroHome";
import NewArrivals from "../components/Home/NewArrivals";
import SpotLight from "../components/Home/SpotLight";
import ShopNow from "../components/Home/ShopNow";
import Ingredient from "../components/Home/Ingredient";

const Home = ({ products }) => {
  return (
    <>
      <HeroHome />
      <NewArrivals products={products} />
      <SpotLight products={products} />
      <ShopNow />
      <Ingredient/>
    </>
  );
};

export default Home;

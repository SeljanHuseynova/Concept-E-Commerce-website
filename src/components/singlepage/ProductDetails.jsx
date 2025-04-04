import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ProductAccordion from "./ProductAccordion";
import { LanguageContext } from "../../context/LanguageProvider";

const ProductDetails = () => {
  const { id } = useParams();
  const product = useSelector((state) =>
    state.products.filteredProducts.find((p) => p.id === Number(id))
  );
  const {t} = useContext(LanguageContext);

  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="product-details">
      <div className="top">
        <p
          className={activeTab === "description" ? "active" : ""}
          onClick={() => setActiveTab("description")}
        >
         {t("product-details.desc")}
        </p>
        <p
          className={activeTab === "benefits" ? "active" : ""}
          onClick={() => setActiveTab("benefits")}
        >
           {t("product-details.benefits")}
        </p>
        <p
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
           {t("product-details.ingredients")}
        </p>
        <p
          className={activeTab === "howTo" ? "active" : ""}
          onClick={() => setActiveTab("howTo")}
        >
           {t("product-details.how-to")}
        </p>
      </div>
      <div className="bottom" key={activeTab}>
        {activeTab === "description" && <p>{product?.description}</p>}
        {activeTab === "benefits" && <p>{product?.benefits}</p>}
        {activeTab === "ingredients" && <p>{product?.ingredients}</p>}
        {activeTab === "howTo" && <p>{product?.howTo}</p>}
      </div>
      <ProductAccordion product={product}/>
    </div>
  );
};

export default ProductDetails;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchModal = ({ closeModal }) => {
  const allProducts = useSelector((state) => state.products?.filteredProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = allProducts?.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, allProducts]);
console.log(filteredProducts)
  return (
    <div className="search-modal">
      <h2>Search</h2>
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredProducts.length > 0 && <p className="products-title">PRODUCTS</p>}

      <ul>
        {filteredProducts?.map((product) => (
          <Link
            to={`/products/${product.id}`}
            style={{textDecoration:'none'}}
            className="link"
            onClick={closeModal} 
            key={product.id} 

          >
            <li className="product">
              <div className="left">
                <img src={product.images[0]} alt="product" />
              </div>
              <div className="right">
                <span className="brand">{product.brand}</span>
                <span className="name">{product.name}</span>
                <span className="price">${product.price.toFixed(2)}</span>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SearchModal;

import React, { useContext, useEffect } from "react";
import { WishListContext } from "../../context/WIshListProvider";
import { GoHeart } from "react-icons/go";
import AOS from "aos";
import "aos/dist/aos.css";

const AllProducts = ({ products }) => {
  const { wishlist, toggleWishlist } = useContext(WishListContext);
  console.log(products)
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
    <div className="all-products">
      <div className="products-container">
        <div className="products">
          {products.map((product) => (
            <div
              key={product.id}
              data-id ={product.id}
              className="product-cart"
              style={{ backgroundImage: `url(${product.images[0]})` }}
              data-aos="fade-up"
            >
              <div className="top">
                <span className="product-brand" data-aos="fade-down">
                  {product.brand}
                </span>
                <h2 className="product-name" data-aos="fade-right">
                  {product.name}
                </h2>
              </div>

              <div className="bottom">
                <span className="price" data-aos="zoom-in">
                  ${product.price}
                </span>
              </div>

              <div className="hover-buttons" data-aos="fade-left">
                <div
                  className={`wishlist ${
                    wishlist.some((item) => item.id === product.id)
                      ? "in-wishlist"
                      : ""
                  }`}
                  onClick={() => toggleWishlist(product)}
                >
                  <GoHeart
                    className={`icon ${
                      wishlist.some((item) => item.id === product.id)
                        ? "filled"
                        : ""
                    }`}
                  />
                </div>

                <div className="btn">
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

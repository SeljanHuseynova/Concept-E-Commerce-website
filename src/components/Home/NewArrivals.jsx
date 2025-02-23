import React, { useContext, useEffect } from "react";
import { GoHeart } from "react-icons/go";
import AOS from "aos";
import "aos/dist/aos.css";
import { WishListContext } from "../../context/WIshListProvider";

const NewArrivals = ({ products }) => {
  const { addToWishlist, wishlist } = useContext(WishListContext);
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  const newArrivals = products.filter((item) => [1, 2, 3, 5].includes(item.id));

  return (
    <div className="new-arrivals">
      <div className="title" data-aos="fade-up">
        <h2>What's New</h2>
        <span>SHOP NEW ARRIVALS</span>
      </div>
      <div className="products-container">
        <div className="products">
          {newArrivals.map((product) => (
            <div
              key={product.id}
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
                  className="wishlist"
                  onClick={() => addToWishlist(product)}
                >
                  <GoHeart className="icon" data-aos="zoom-in" />
                </div>
                <div className="btn">
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;

import React, { useContext, useEffect } from "react";
import { GoHeart } from "react-icons/go";
import AOS from "aos";
import "aos/dist/aos.css";
import { WishListContext } from "../../context/WIshListProvider";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/accountSlice";

const EnhanceProducts = () => {
  const { toggleWishlist, wishlist } = useContext(WishListContext);
  const products = useSelector((state) => state.products.filteredProducts);
  console.log(products)
  const dispatch = useDispatch();
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  const newArrivals = products.filter((item) => [1, 2, 12].includes(item.id));
  const currentUser = useSelector((state) => state.users?.currentUser);
  const handleAddToCart = (product) => {
    if (!currentUser) {
      alert("Please log in to add items to the cart.");
      return;
    }
    dispatch(addToCart({ userId: currentUser.id, product }));
  };

  return (
    <div className="enhance-products">
      <div className="products-container">
        <div className="products">
          {newArrivals.map((product) => (
            <div
              key={product.id}
              data-id={product.id}
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

export default EnhanceProducts;

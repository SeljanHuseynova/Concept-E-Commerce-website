import React, { useContext, useEffect } from "react";
import { GoHeart } from "react-icons/go";
import AOS from "aos";
import "aos/dist/aos.css";
import { addToCart } from "../../redux/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { WishListContext } from "../../context/WishListProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router";
import { LanguageContext } from "../../context/LanguageProvider";
const AllProducts = ({ products }) => {
  const {t} = useContext(LanguageContext);
  const { wishlist, toggleWishlist } = useContext(WishListContext);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  if (!products || products.length === 0) {
    return <div className="no-result">Loading or No Products Found</div>;
  }
  const handleAddToCart = (product,e) => {
    e.preventDefault();
    if (!currentUser) {
      toast.error(t("alert.please-log-in"));
      return;
    }
    dispatch(addToCart({ userId: currentUser.id, product }));
   
  };
  return (
    <div className="all-products">
      <div className="products-container">
        <div className="products">
          {products.map((product) => (
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

              <Link
                to={`/products/${product.id}`}
                className="hover-buttons"
                data-aos="fade-left"
              >
                <div
                  className={`wishlist ${
                    wishlist.some((item) => item.id === product.id)
                      ? "in-wishlist"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product);
                  }}
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
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

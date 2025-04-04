import React, { useContext } from "react";
import { WishListContext } from "../../context/WishListProviderNew";
import { addToCart } from "../../redux/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { MdAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router";
import { LanguageContext } from "../../context/LanguageProvider";

const WishListModal = ({closeModal}) => {
  const {t} = useContext(LanguageContext);
  const { wishlist, toggleWishlist, clearWishlist } = useContext(WishListContext);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);

  const handleAddToCart = (product) => {
    if (!currentUser) {
     toast.error("Please log in to add items to the cart.");
      return;
    }
    dispatch(addToCart({ userId: currentUser.id, product }));
  };

  return (
    <div className="wishlist-container">
      <div className="top">
        <h5>{t("wishlist.head")}</h5>
        {wishlist.length > 0 && (
          <button onClick={clearWishlist} className="clear-all">{t("wishlist.button")}</button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <CiHeart className="icon" />
          <div className="content">
            <span>{t("wishlist.span")}</span>
            <p>{t("wishlist.p")}</p>
          </div>
        </div>
      ) : (
        <div className="wishlist">
          {wishlist.map((product, index) => (
            
            <div key={product.id || index} className="wishlist-product">
              <div className="left">
                <img src={product.images[0]} alt={product.name} width="50" />
              </div>
              <div className="right">
              <Link
            to={`/products/${product.id}`}
            style={{textDecoration:'none',color:'black'}}
            className="link"
            onClick={closeModal} 
            key={product.id} 
          >
                <div className="top">
                  <p className="name">{product.name}</p>
                  <p className="brand">{product.brand}</p>
                </div>
                </Link>
                <div className="bottom">
                  <p className="price">${product.price}</p>
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    {t("wishlist.add")}
                    <MdAddShoppingCart className="add-icon" />
                  </button>
                </div>
                <div
                  className="remove-wishlist"
                  onClick={() => toggleWishlist(product)}
                >
                  <TfiClose className="cls-icon" />
                </div>
              </div>
            </div>
        
          ))}
        </div>
      )}
    </div>
  );
};

export default WishListModal;

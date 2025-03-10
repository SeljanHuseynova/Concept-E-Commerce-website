import React, { useContext } from "react";
import { WishListContext } from "../../context/WishListProvider";
import { addToCart } from "../../redux/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { MdAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WishListModal = () => {
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
        <h5>Wishlist</h5>
        {wishlist.length > 0 && (
          <button onClick={clearWishlist} className="clear-all">Clear All</button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <CiHeart className="icon" />
          <div className="content">
            <span>You don't have any favorites yet</span>
            <p>Tap the heart on any product to save it to your favorites.</p>
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
                <div className="top">
                  <p className="name">{product.name}</p>
                  <p className="brand">{product.brand}</p>
                </div>
                <div className="bottom">
                  <p className="price">${product.price}</p>
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(product)}
                  >
                    Quick Add
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

import React, { useContext } from "react";
import { WishListContext } from "../../context/WIshListProvider";
import { FaRegHeart } from "react-icons/fa";
import { addToCart } from "../../redux/accountSlice";
import { useDispatch, useSelector } from "react-redux";

const WishListModal = () => {
  const { wishlist, removeFromWishlist } = useContext(WishListContext);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);

  const handleAddToCart = (product) => {
    if (!currentUser) {
      alert("Please log in to add items to the cart.");
      return;
    }
    dispatch(addToCart({ userId: currentUser.id, product }));
  };
  return (
    <div className="wishlist-container">
      <h5>Wishlist</h5>
      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <FaRegHeart className="hrt-icon" />
          <span>You don't have any favorites yet</span>
          <p>Tap the heart on any product to save it to your favorites.</p>
        </div>
      ) : (
        <div className="wishlist">
          {wishlist.map((product) => (
            <div key={product.id} className="wishlist-product">
              <p className="name">{product.name}</p>
              <p className="price">{product.price}</p>
              <button
                className="add-to-cart"
                onClick={() => handleAddToCart(product)}
              >
                add to cart
              </button>
              <div
                className="remove-wishlist"
                onClick={() => removeFromWishlist(product.id)}
              >
                remove from wishlist
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishListModal;

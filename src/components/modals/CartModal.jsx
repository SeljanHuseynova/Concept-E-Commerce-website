import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearAll,
  fetchCart,
} from "../../redux/accountSlice";
import { Link } from "react-router-dom";
import { IoIosClose } from "react-icons/io";

const CartModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users?.currentUser);
  const cart = useMemo(() => currentUser?.cart || [], [currentUser]);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchCart(currentUser.id));
    }
  }, [dispatch, currentUser]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleIncrease = (productId) => {
    if (currentUser) {
      dispatch(increaseQuantity({ userId: currentUser.id, productId }));
    }
  };

  const handleDecrease = (productId) => {
    if (currentUser) {
      dispatch(decreaseQuantity({ userId: currentUser.id, productId }));
    }
  };

  const handleRemove = (productId) => {
    if (currentUser) {
      dispatch(removeFromCart({ userId: currentUser.id, productId }));
    }
  };

  return (
    <div className="cart-modal">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <div className="empty">
          <p>Your cart is empty.</p>
          <Link to="/products" className="link" onClick={closeModal}>
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          <span className="items">{totalItems} items</span>
          <div className="cart">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="left">
                  <img src={item.image} alt={item.name} width="50" />
                </div>
                <div className="right">
                  <p className="name">{item.name}</p>
                  <div className="bottom">
                    <div className="quantity">
                      <button onClick={() => handleDecrease(item.id)}>-</button>
                      <p>{item.quantity}</p>
                      <button onClick={() => handleIncrease(item.id)}>+</button>
                    </div>
                  </div>
                  <p className="price">${item.price}</p>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="icon-container"
                  >
                    <IoIosClose className="icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="below">
            <p className="total">
              <span>Total:</span>
              <span className="total-price">${totalPrice}</span>
            </p>
            <div className="buttons">
              <button onClick={() => dispatch(clearAll(currentUser.id))}>
                Clear All
              </button>
              <Link to="/check-out" className="link">
                Check Out
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeFromCart, fetchCart, clearAll } from "../../redux/accountSlice";
import { Link } from "react-router";

const CartModal = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.users.currentUser?.cart || []);
  const currentUser = useSelector((state) => state.users.currentUser);

  // useEffect(() => {
  //   if (currentUser) {
  //     dispatch(fetchCart(currentUser.id));
  //   }
  // }, [dispatch, currentUser]);

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
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
        <div className="cart">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} width="50" />
              <div>
                <p>{item.name}</p>
                <div className="quantity">
                  <button onClick={() => handleDecrease(item.id)}>-</button>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => handleIncrease(item.id)}>+</button>
                </div>
                <p>Price: ${item.price}</p>
                <p>Total: ${item.price * item.quantity}</p>
                <button onClick={() => handleRemove(item.id)}>❌ Remove</button>
              </div>
            </div>
          ))}
          
        </div>
        <div className="buttons">
        <button onClick={() => dispatch(clearAll(currentUser.id))}>Clear All</button>
        <Link to='/check-out'>Check Out</Link>
      </div>
      </>
      )}
    </div>
  );
};

export default CartModal;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, fetchCart } from "../../redux/accountSlice";

const CartModal = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.users.currentUser?.cart || []);
  const currentUser = useSelector((state) => state.users.currentUser);
  console.log(cart);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchCart(currentUser.id));
    }
  }, [dispatch]);

  
  return (
    <div className="cart-modal">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} width="50" />
              <div>
                <p>{item.name}</p>
                <div className="quantity">
                  <span>-</span>
                <p>Quantity: {item.quantity}</p>
                <span onClick={() =>dispatch(addToCart(item))}>+</span>
                </div>
                <p>Price: ${item.price}</p>
                <p>Total: ${item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartModal;

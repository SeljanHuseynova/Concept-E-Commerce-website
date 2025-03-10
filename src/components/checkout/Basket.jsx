import React, { useState } from "react";
import { useSelector } from "react-redux";

const Basket = () => {
  const cart = useSelector((state) => state.users.currentUser?.cart || []);

  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

 
  const handlePromoCodeApply = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      let newTotal = totalPrice;

      if (promoCode === "NOVRUZ30") {
        newTotal = totalPrice * 0.7; 
        setDiscountApplied("✅ Code Applied: NOVRUZ30 (30% OFF)");
        setErrorMessage(""); 
      } else if (promoCode === "NACLES50") {
        newTotal = Math.max(0, totalPrice - 50); 
        setDiscountApplied("✅ Code Applied: NACLES50 ($50 OFF)");
        setErrorMessage(""); 
      } else {
        setErrorMessage("❌ Invalid Promo Code");
        setDiscountApplied(""); 
        setDiscountedTotal(null); 
        return;
      }

      setDiscountedTotal(newTotal);
    }
  };

  return (
    <div className="basket">
      <div className="cart-check-out">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} width="50" />
            <div>
              <p>{item.name}</p>
              <div className="quantity">
                <p>Quantity: {item.quantity}</p>
              </div>
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}

        {/* Promo Code Input (Capital Letters Only) */}
        <div className="promo-section">
          <input
            type="text"
            className="promo-code"
            placeholder="Enter Promo Code (CAPS ONLY)"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())} // Convert input to uppercase
            onKeyDown={handlePromoCodeApply} 
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {discountApplied && <p className="discount-message">{discountApplied}</p>}

        <div className="total-price">
          <p>Total Price:</p>
          <span>${discountedTotal !== null ? discountedTotal.toFixed(2) : totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Basket;

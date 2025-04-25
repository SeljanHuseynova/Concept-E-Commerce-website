import React, { useState,useContext } from "react";
import { useSelector } from "react-redux";
import { MdOutlineDiscount } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { LanguageContext } from "../../context/LanguageProvider";

const Basket = () => {
  const {t} = useContext(LanguageContext);
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
        setDiscountApplied(
          <>
            <CiCircleCheck className="success-icon"/> {t("basket.applied")} <strong>NOVRUZ30</strong> (30% OFF)
          </>
        );
        setErrorMessage("");
      } else if (promoCode === "NACLES50") {
        newTotal = Math.max(0, totalPrice - 50);
        setDiscountApplied(
          <>
            <CiCircleCheck className="success-icon"/> {t("basket.applied")} <strong>NACLES50</strong> ($50 OFF)
          </>
        );
        setErrorMessage("");
      } else {
        setErrorMessage(
          <>
            <IoIosCloseCircleOutline className="error-icon"/> {t("basket.invalid")}
          </>
        );
        setDiscountApplied(null);
        setDiscountedTotal(null);
        return;
      }
  
      setDiscountedTotal(newTotal);
    }
  };
  
  const totalSavings = discountedTotal !== null ? totalPrice - discountedTotal : 0;
  return (
    <div className="basket">
      <div className="cart-check-out">
        <div className="items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="left">
                <img src={item.image} alt={item.name} width="50" />
                <span>{item.quantity}</span>
              </div>
              <div className="right">
                <p>{item.name}</p>
                <p className="price">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="promo-section">
          <input
            type="text"
            className="promo-code"
            placeholder="Enter Promo Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            onKeyDown={handlePromoCodeApply}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {discountApplied && <p className="discount-message">{discountApplied}</p>}
        <div className="total-price">
          <p className="total">{t("basket.total")}</p>
          <span><span className="usd">USD</span>${discountedTotal !== null ? discountedTotal.toFixed(2) : totalPrice.toFixed(2)}</span>
        </div>
        {discountedTotal !== null && (
          <div className="total-saving">
            <p><MdOutlineDiscount className='icon'/>{t("basket.savings")} ${totalSavings.toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;

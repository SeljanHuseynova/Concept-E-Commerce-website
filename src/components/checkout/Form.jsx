import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAll, updateStockAfterPurchase } from "../../redux/accountSlice";
import { useNavigate } from "react-router";

const Form = () => {
  const currentUser = useSelector((state) => state.users.currentUser);
  const cart = useSelector((state) => state.users.currentUser?.cart || []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    region: "",
    firstName: "",
    secondName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    shippingMethod: "",
    payment: "",
    billing: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
  
    // Validate form fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = "Bu sahə boş qala bilməz!";
      }
    });
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    // Check if cart is empty before calling the function
    if (!currentUser?.cart?.length) {
      alert("Səbət boşdur!");
      return;
    }
  
    // First, update stock, then clear the cart
    dispatch(updateStockAfterPurchase(currentUser.id))
      .unwrap()
      .then(() => {
        dispatch(clearAll(currentUser.id));
        navigate("/");
        alert("Form uğurla göndərildi və məhsulların ehtiyatı yeniləndi!");
      })
      .catch((error) => {
        alert("Sifariş tamamlanmadı: " + error);
      });
  };
  

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <select name="region" value={formData.region} onChange={handleChange}>
          <option value="">Ölkəni seçin</option>
          <option value="canada">Kanada</option>
          <option value="united-state">Amerika</option>
        </select>
        {errors.region && <p className="error">{errors.region}</p>}

        <div className="name">
          <input
            type="text"
            name="firstName"
            placeholder="Ad"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}

          <input
            type="text"
            name="secondName"
            placeholder="Soyad"
            value={formData.secondName}
            onChange={handleChange}
          />
          {errors.secondName && <p className="error">{errors.secondName}</p>}
        </div>

        <input
          type="text"
          name="address"
          placeholder="Ünvan"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p className="error">{errors.address}</p>}

        <input
          type="text"
          name="apartment"
          placeholder="Mənzil"
          value={formData.apartment}
          onChange={handleChange}
        />

        <div className="details">
          <input
            type="text"
            name="city"
            placeholder="Şəhər"
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <p className="error">{errors.city}</p>}

          <input
            type="text"
            name="state"
            placeholder="Dövlət"
            value={formData.state}
            onChange={handleChange}
          />
          {errors.state && <p className="error">{errors.state}</p>}

          <input
            type="text"
            name="postalCode"
            placeholder="Poçt Kodu"
            value={formData.postalCode}
            onChange={handleChange}
          />
          {errors.postalCode && <p className="error">{errors.postalCode}</p>}
        </div>

        {/* Çatdırılma Metodu */}
        <div className="shipping">
          <h4>Çatdırılma Metodu</h4>
          <input
            type="text"
            name="shippingMethod"
            placeholder="Çatdırılma Metodu"
            value={formData.shippingMethod}
            onChange={handleChange}
          />
          {errors.shippingMethod && (
            <p className="error">{errors.shippingMethod}</p>
          )}
        </div>

        {/* Ödəniş Metodu */}
        <div className="payment">
          <h4>Ödəniş Metodu</h4>
          <label>
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={formData.payment === "paypal"}
              onChange={handleChange}
            />
            PayPal
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={formData.payment === "cod"}
              onChange={handleChange}
            />
            Nağd Ödəniş
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="money-order"
              checked={formData.payment === "money-order"}
              onChange={handleChange}
            />
            Pul Köçürməsi
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="google-pay"
              checked={formData.payment === "google-pay"}
              onChange={handleChange}
            />
            Google Pay
          </label>
        </div>
        {errors.payment && <p className="error">{errors.payment}</p>}

        {/* Faktura Ünvanı */}
        <div className="billing-address">
          <h4>Faktura Ünvanı</h4>
          <label>
            <input
              type="radio"
              name="billing"
              value="same"
              checked={formData.billing === "same"}
              onChange={handleChange}
            />
            Çatdırılma ünvanı ilə eyni
          </label>
          <label>
            <input
              type="radio"
              name="billing"
              value="new"
              checked={formData.billing === "new"}
              onChange={handleChange}
            />
            Yeni Ünvan
          </label>
        </div>
        {errors.billing && <p className="error">{errors.billing}</p>}

        <button type="submit">Formu Göndər</button>
      </form>
    </div>
  );
};

export default Form;

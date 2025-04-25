import React, { useContext } from "react";
import paypal from "../../assets/images/general/paypal-white.svg";
import { LanguageContext } from "../../context/LanguageProvider";
const Form = ({ handleSubmit, formData, handleChange, errors }) => {
  const {t} = useContext(LanguageContext);
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <select name="region" value={formData.region} onChange={handleChange}>
          <option value="">{t("checkout.country")}</option>
          <option value="canada">Canada</option>
          <option value="united-state">United States</option>
        </select>
        {errors.region && <p className="error">{errors.region}</p>}
        <div className="name">
          <div className="part">
            <input
              type="text"
              name="firstName"
              placeholder={t("checkout.first")}
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>
          <div className="part">
            <input
              type="text"
              name="secondName"
              placeholder={t("checkout.last")}
              value={formData.secondName}
              onChange={handleChange}
            />
            {errors.secondName && <p className="error">{errors.secondName}</p>}
          </div>
        </div>

        <input
          type="text"
          name="address"
          placeholder={t("checkout.address")}
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p className="error">{errors.address}</p>}

        <input
          type="text"
          name="apartment"
          placeholder={t("checkout.apartment")}
          value={formData.apartment}
          onChange={handleChange}
        />

        <div className="details">
          <div className="part">
            <input
              type="text"
              name="city"
              placeholder={t("checkout.city")}
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>
          <div className="part">
            <input
              type="text"
              name="state"
              placeholder={t("checkout.state")}
              value={formData.state}
              onChange={handleChange}
            />
            {errors.state && <p className="error">{errors.state}</p>}
          </div>
          <div className="part">
            <input
              type="text"
              name="postalCode"
              placeholder={t("checkout.postal")}
              value={formData.postalCode}
              onChange={handleChange}
            />
            {errors.postalCode && <p className="error">{errors.postalCode}</p>}
          </div>
        </div>

        <div className="shipping">
          <h4>{t("checkout.shipping")}</h4>
          <input
            type="text"
            name="shippingMethod"
            placeholder={t("checkout.shipping")}
            value={formData.shippingMethod}
            onChange={handleChange}
          />
          {errors.shippingMethod && (
            <p className="error">{errors.shippingMethod}</p>
          )}
        </div>

        <div className="payment">
          <h4>{t("checkout.payment")}</h4>
          <div className="content">
            <label>
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={formData.payment === "paypal"}
                onChange={handleChange}
              />
              {t("checkout.paypal")}
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={formData.payment === "cod"}
                onChange={handleChange}
              />
              {t("checkout.cash")}
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="money-order"
                checked={formData.payment === "money-order"}
                onChange={handleChange}
              />
              Money Order
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="google-pay"
                checked={formData.payment === "google-pay"}
                onChange={handleChange}
              />
             {t("checkout.google")}
            </label>
          </div>
        </div>
        {errors.payment && <p className="error">{errors.payment}</p>}

        <div className="billing-address">
          <h4>{t("checkout.billing")}</h4>
          <div className="content">
            <label>
              <input
                type="radio"
                name="billing"
                value="same"
                checked={formData.billing === "same"}
                onChange={handleChange}
              />
              {t("checkout.same")}
            </label>
            <label>
              <input
                type="radio"
                name="billing"
                value="new"
                checked={formData.billing === "new"}
                onChange={handleChange}
              />
              {t("checkout.new")}
            </label>
          </div>
        </div>
        {errors.billing && <p className="error">{errors.billing}</p>}

        <button type="submit">
        {t("checkout.paywith")} <img src={paypal} alt="paypal" width={90} />
        </button>
      </form>
    </div>
  );
};

export default Form;

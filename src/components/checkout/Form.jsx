import React from "react";
import paypal from "../../assets/images/general/paypal-white.svg";
const Form = ({ handleSubmit, formData, handleChange, errors }) => {
  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <select name="region" value={formData.region} onChange={handleChange}>
          <option value="">Select a country</option>
          <option value="canada">Canada</option>
          <option value="united-state">United States</option>
        </select>
        {errors.region && <p className="error">{errors.region}</p>}
        <div className="name">
          <div className="part">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>
          <div className="part">
            <input
              type="text"
              name="secondName"
              placeholder="Last Name"
              value={formData.secondName}
              onChange={handleChange}
            />
            {errors.secondName && <p className="error">{errors.secondName}</p>}
          </div>
        </div>

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        {errors.address && <p className="error">{errors.address}</p>}

        <input
          type="text"
          name="apartment"
          placeholder="Apartment"
          value={formData.apartment}
          onChange={handleChange}
        />

        <div className="details">
          <div className="part">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
            />
            {errors.city && <p className="error">{errors.city}</p>}
          </div>
          <div className="part">
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
            />
            {errors.state && <p className="error">{errors.state}</p>}
          </div>
          <div className="part">
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
            />
            {errors.postalCode && <p className="error">{errors.postalCode}</p>}
          </div>
        </div>

        <div className="shipping">
          <h4>Shipping Method</h4>
          <input
            type="text"
            name="shippingMethod"
            placeholder="Shipping Method"
            value={formData.shippingMethod}
            onChange={handleChange}
          />
          {errors.shippingMethod && (
            <p className="error">{errors.shippingMethod}</p>
          )}
        </div>

        <div className="payment">
          <h4>Payment Method</h4>
          <div className="content">
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
              Cash on Delivery
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
              Google Pay
            </label>
          </div>
        </div>
        {errors.payment && <p className="error">{errors.payment}</p>}

        <div className="billing-address">
          <h4>Billing Address</h4>
          <div className="content">
            <label>
              <input
                type="radio"
                name="billing"
                value="same"
                checked={formData.billing === "same"}
                onChange={handleChange}
              />
              Same as shipping address
            </label>
            <label>
              <input
                type="radio"
                name="billing"
                value="new"
                checked={formData.billing === "new"}
                onChange={handleChange}
              />
              New Address
            </label>
          </div>
        </div>
        {errors.billing && <p className="error">{errors.billing}</p>}

        <button type="submit">
          Pay with <img src={paypal} alt="paypal" width={90} />
        </button>
      </form>
    </div>
  );
};

export default Form;

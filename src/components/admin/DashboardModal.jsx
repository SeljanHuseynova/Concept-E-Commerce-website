import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct, editProduct, fetchProducts } from "../../redux/productsSlice";
import { useActionData } from "react-router";

const DashboardModal = ({ product, onClose }) => {
  
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    brand: "",
    description: "",
    price: "",
    onsale: false,
    discountPercentage: "",
    salePrice: "",
    rate: "",
    images: "[]", 
    quantity: "",
    category: "",
    subCategory: "",
    benefits: "",
    ingredients: "",
    howTo: "",
    reviews:"[]",
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanFormData = {
      ...formData,
      id: product ? Number(product.id) : Date.now(), 
      price: formData.price ? Number(formData.price) : null,
      discountPercentage: formData.discountPercentage ? Number(formData.discountPercentage) : null,
      salePrice: formData.salePrice ? Number(formData.salePrice) : null,
      rate: formData.rate ? Number(formData.rate) : null,
      quantity: formData.quantity ? Number(formData.quantity) : null,
      images: Array.isArray(formData.images) ? formData.images : JSON.parse(formData.images || "[]"),
      reviews: Array.isArray(formData.reviews) ? formData.reviews : JSON.parse(formData.reviews || "[]"),
    };
    if (product) {
      dispatch(editProduct({ id: product.id, updates: formData }));
    } else {
      dispatch(addProduct(cleanFormData)).then(()=> dispatch(fetchProducts()));
    }
    onClose();
  };

  return (
    <div className="modal-admin">
      <div className="modal-content">
        <h2>{product ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
          <input name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} required />
          <label id="sale">
            <input type="checkbox" name="onsale" checked={formData.onsale} onChange={handleChange} />
            On Sale
          </label>
          <input name="discountPercentage" type="number" placeholder="Discount %" value={formData.discountPercentage} onChange={handleChange} />
          <input name="salePrice" type="number" placeholder="Sale Price" value={formData.salePrice} onChange={handleChange} />
          <input name="rate" type="number" placeholder="Rate" value={formData.rate} onChange={handleChange} />
          <input name="images" placeholder="Images (JSON format)" value={formData.images} onChange={handleChange} />
          <input name="quantity" type="number" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />
          <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
          <input name="subCategory" placeholder="Sub-Category" value={formData.subCategory} onChange={handleChange} />
          <textarea name="benefits" placeholder="Benefits" value={formData.benefits} onChange={handleChange} />
          <textarea name="ingredients" placeholder="Ingredients" value={formData.ingredients} onChange={handleChange} />
          <textarea name="howTo" placeholder="How To Use" value={formData.howTo} onChange={handleChange} />
          <input name="reviews" placeholder="Reviews" value={formData.rewievs} onChange={handleChange} />
          <button type="submit">{product ? "Update" : "Add"}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default DashboardModal;
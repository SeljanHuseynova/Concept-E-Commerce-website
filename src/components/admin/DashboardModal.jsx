import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addProduct,
  editProduct,
  fetchProducts,
} from "../../redux/productsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminModalForm from "./AdminModalForm";


const DashboardModal = ({ product, onClose }) => {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const nav = document.querySelector("nav");
    const handleScroll = () => {
      if (window.scrollY > 50) {
        if (nav) nav.style.display = "none";
      } else {
        if (nav) nav.style.display = "";
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      document.documentElement.style.overflow = "";
      if (nav) nav.style.display = "";
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    reviews: "[]",
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
      discountPercentage: formData.discountPercentage
        ? Number(formData.discountPercentage)
        : null,
      salePrice: formData.salePrice ? Number(formData.salePrice) : null,
      rate: formData.rate ? Number(formData.rate) : null,
      quantity: formData.quantity ? Number(formData.quantity) : null,
      images: Array.isArray(formData.images)
        ? formData.images
        : JSON.parse(formData.images || "[]"),
      reviews: Array.isArray(formData.reviews)
        ? formData.reviews
        : JSON.parse(formData.reviews || "[]"),
    };
    if (product) {
      dispatch(editProduct({ id: product.id, updates: formData }));
      toast.success("Product successfully edited!");
    } else {
      dispatch(addProduct(cleanFormData)).then(() => dispatch(fetchProducts()));
      toast.success("Product successfully added!");
    }
    onClose();
  };

  return (
    <div className="modal-admin">
    <AdminModalForm product={product} handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} onClose={onClose}/>
    </div>
  );
};

export default DashboardModal;

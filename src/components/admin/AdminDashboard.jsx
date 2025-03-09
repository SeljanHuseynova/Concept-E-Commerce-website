import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardModal from "./DashboardModal";
import { fetchProducts, removeProduct } from "../../redux/productsSlice";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleRemove = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="admin-dashboard">
      <div className="top">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="main">
        <div className="product-table">
          <button onClick={openAddModal}>Add Product</button>
          {products.map((product) => (
            <div className="product" key={product.id}>
              <p>{product.id}</p>
              <div className="name">{product.name}</div>
              <div className="brand">{product.brand}</div>
              <div className="price">${product.price}</div>
              <div className="quantity">{product.quantity}</div>
              <div className="rate">{product.rate}</div>
              <button onClick={() => handleRemove(product.id)}>Remove</button>
              <button onClick={() => openEditModal(product)}>Edit</button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <DashboardModal
            product={editingProduct}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

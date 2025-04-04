import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardModal from "../components/admin/DashboardModal";
import { removeProduct } from "../redux/productsSlice";
import Breadcrumb from "../components/Global/breadcrumb/BreamCrumb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2"; 


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

  const handleRemove = (product) => {
    Swal.fire({
      title: `Are you sure you want to remove ${product.name}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeProduct(product.id));
        toast.success("Product deleted successfully!");
      }
    });
  };

  return (
    <div className="admin-dashboard">
      <Breadcrumb />
      <div className="top">
        <span onClick={handleLogout} className="log-out-btn">Logout</span>
      </div>
      <div className="main">
        <div className="product-table">
          <button onClick={openAddModal} className="add-product">Add Product</button>
          <table className="table">
            <thead>
              <tr>           
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product,index) => (
                <tr key={product.id || index}>           
                  <td className="name">{product.name}</td>
                  <td>{product.brand}</td>
                  <td>${product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <button onClick={() => handleRemove(product)}>Remove</button>
                  </td>
                  <td>
                    <button onClick={() => openEditModal(product)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

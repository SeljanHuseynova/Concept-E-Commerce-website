import React from 'react'

const AdminModalForm = ({product,handleSubmit,handleChange,formData,onClose}) => {
  return (
    <div className="modal-content">
    <h2>{product ? "Edit Product" : "Add Product"}</h2>
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="brand"
        placeholder="Brand"
        value={formData.brand}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <label id="sale">
        <input
          type="checkbox"
          name="onsale"
          className="onsale"
          checked={formData.onsale}
          onChange={handleChange}
        />
        On Sale
      </label>
      <input
        name="discountPercentage"
        type="number"
        placeholder="Discount %"
        value={formData.discountPercentage}
        onChange={handleChange}
      />
      <input
        name="salePrice"
        type="number"
        placeholder="Sale Price"
        value={formData.salePrice}
        onChange={handleChange}
      />
      <input
        name="rate"
        type="number"
        placeholder="Rate"
        value={formData.rate}
        onChange={handleChange}
      />
      <input
        name="images"
        placeholder="Images (JSON format)"
        value={formData.images}
        onChange={handleChange}
      />
      <input
        name="quantity"
        type="number"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
      />
      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />
      <input
        name="subCategory"
        placeholder="Sub-Category"
        value={formData.subCategory}
        onChange={handleChange}
      />
      <textarea
        name="benefits"
        placeholder="Benefits"
        value={formData.benefits}
        onChange={handleChange}
      />
      <textarea
        name="ingredients"
        placeholder="Ingredients"
        value={formData.ingredients}
        onChange={handleChange}
      />
      <textarea
        name="howTo"
        placeholder="How To Use"
        value={formData.howTo}
        onChange={handleChange}
      />
      <input
        name="reviews"
        placeholder="Reviews"
        value={formData.rewievs}
        onChange={handleChange}
      />
      <button type="submit">{product ? "Update" : "Add"}</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  </div>
  )
}

export default AdminModalForm
import React, { useState } from "react";
import axios from "axios";
import { productsUrl, headers } from "../../supabase";

const ReviewModal = ({ closeModal, addReview, productId }) => {
  const [name, setName] = useState("");
  const [headLine, setHeadLine] = useState("");
  const [text, setText] = useState("");
  const [rate, setRate] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newReview = { name, headLine, text, rate };

    try {
   
      const { data } = await axios.get(
        `${productsUrl}?id=eq.${productId}&select=reviews`,
        { headers }
      );
      const existingReviews = data.length > 0 ? data[0].reviews : [];
      const updatedReviews = [...existingReviews, newReview];
      await axios.patch(
        `${productsUrl}?id=eq.${productId}`,
        { reviews: updatedReviews },
        { headers }
      );
      addReview(newReview);
      closeModal();
    } catch (error) {
      console.error("Error posting review:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Write a Review</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Headline"
            value={headLine}
            onChange={(e) => setHeadLine(e.target.value)}
            required
          />
          <textarea
            placeholder="Your Review"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <input
            type="number"
            min="1"
            max="5"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </button>
          <button type="button" onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;

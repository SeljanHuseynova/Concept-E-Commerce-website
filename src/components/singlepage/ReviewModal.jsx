import React, { useState } from 'react'

const ReviewModal = ({ closeModal, addReview }) => {
    const [name, setName] = useState("");
    const [headLine, setHeadLine] = useState("");
    const [text, setText] = useState("");
    const [rate, setRate] = useState(5);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      addReview({ name, headLine, text, rate });
      closeModal();
    };
  
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Write a Review</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Headline" value={headLine} onChange={(e) => setHeadLine(e.target.value)} required />
            <textarea placeholder="Your Review" value={text} onChange={(e) => setText(e.target.value)} required />
            <input type="number" min="1" max="5" value={rate} onChange={(e) => setRate(Number(e.target.value))} required />
            <button type="submit">Submit Review</button>
            <button type="button" onClick={closeModal}>Cancel</button>
          </form>
        </div>
      </div>
    );
  };

export default ReviewModal;
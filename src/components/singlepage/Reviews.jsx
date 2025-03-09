import React, { useState, useEffect } from "react";
import ReviewModal from "./ReviewModal";

const defaultReview = {
  name: "Nacles",
  headLine: "Amazing experience!",
  text: "Just got this in the mail, in the color Flamingo Fling. I'm not a big fan of traditional lip glosses, but I absolutely adore this one already. The tube is so pretty, the color is quite noticeable even on top of my natural lips, it's not at all sticky, and it's so shimmery. I love it so much<3",
  rate: 2,
};

const Reviews = () => {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("reviews");
    return savedReviews ? JSON.parse(savedReviews) : [defaultReview]; 
  });

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (newReview) => {
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
  };

  return (
    <div className="reviews">
      <div className="top-part">
        <h1>Reviews</h1>
        <button onClick={() => setModalOpen(true)}>WRITE A REVIEW</button>
      </div>
      <div className="review-list">
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <p className="name">{review.name}</p>
            {[...Array(5)].map((_, starIndex) => (
              <span
                key={starIndex}
                className={starIndex < review.rate ? "star filled" : "star"}
              >
                ★
              </span>
            ))}
            <h3 className="headline">{review.headLine}</h3>
            <p className="text">{review.text}</p>
          </div>
        ))}
      </div>

      {modalOpen && <ReviewModal closeModal={() => setModalOpen(false)} addReview={addReview} />}
    </div>
  );
};

export default Reviews;

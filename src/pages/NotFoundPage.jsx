import React from "react";
import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h5>404</h5>
      <p>Page not found</p>
      <Link to="/products" className="link">
        Continue shopping
      </Link>
    </div>
  );
};

export default NotFoundPage;

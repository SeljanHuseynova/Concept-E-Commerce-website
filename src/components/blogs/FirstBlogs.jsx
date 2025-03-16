import React from "react";
import { blogs } from "../../Blogs";

const FirstBlogs = () => {
  const filteredBlogs = blogs.filter((blog) => [1, 2, 3].includes(blog.id));

  return (
    <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {filteredBlogs.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`} 
          />
        ))}
      </div>
      <div className="carousel-inner">
        {filteredBlogs.map((blog, index) => (
          <div key={blog.id} className={`carousel-item ${index === 0 ? "active" : ""}`} data-bs-interval={5000}>  
            <img src={blog.img} className="d-block w-100" alt={blog.text} />
            <div className="carousel-caption d-none d-md-block">
              <h5>{blog.text}</h5>
              <p>{blog.by} - {blog.date}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default FirstBlogs;

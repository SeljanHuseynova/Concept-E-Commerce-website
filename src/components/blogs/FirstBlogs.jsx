import React, { useContext, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "../../context/LanguageProvider";

const FirstBlogs = () => {
  const {t} = useContext(LanguageContext);
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  const blogs = t('blogs.list', { returnObjects: true });
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
            <img 
              src={blog.img} 
              className="d-block w-100"
              alt={blog.text}
              data-aos="fade-zoom-in"
              data-aos-delay="200"
            />
            <div className="carousel-caption d-none d-md-block" data-aos="fade-up" data-aos-delay="400">
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

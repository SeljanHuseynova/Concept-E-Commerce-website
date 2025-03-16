import React from "react";
import { blogs } from "../../Blogs";

const ThirdBlogs = () => {
  const filteredBlogs = blogs.filter((blog) => [8,9].includes(blog.id));
  return (
    <div className="third-blogs">
      <div className="third-title">
        <h1>Special Offers</h1>
      </div>
      <div className="row">
        {filteredBlogs.map((blog) => (
          <div key={blog.id} className="col-12">
            <div className="blog-card">
              <div className="blog-image">
                <img src={blog.img} alt={`Blog titled: ${blog.text}`} />
              </div>
              <div className="blog-content">
                <div className="tags">
                  {blog.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                <h3 className="blog-title">{blog.text}</h3>
                <div className="blog-meta">
                  <span>By {blog.by}</span>
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThirdBlogs;

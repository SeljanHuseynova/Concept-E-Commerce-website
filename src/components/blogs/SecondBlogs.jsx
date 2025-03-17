import React, { useContext, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LanguageContext } from '../../context/LanguageProvider';
const SecondBlogs = () => {
  const {t} = useContext(LanguageContext);
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const blogs = t('blogs.list', { returnObjects: true });
  
  const filteredBlogs = blogs.filter((blog) => [4, 5, 6, 7].includes(blog.id));

  return (
    <div className="second-blogs">
      <div className="row">
        {filteredBlogs.map((blog, index) => (
          <div 
            key={blog.id} 
            className="col-12 col-md-6"
            data-aos="fade-up"
            data-aos-delay={index * 200} 
          >
            <div className="blog-card">
              <div className="blog-image">
                <img src={blog.img} alt={`Blog titled: ${blog.text}`} />
              </div>
              <div className="blog-content">
                <div className="tags">
                  {blog.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
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

export default SecondBlogs;

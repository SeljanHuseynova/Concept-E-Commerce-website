import React from 'react'
import Breadcrumb from '../components/Global/breadcrumb/BreamCrumb'
import FirstBlogs from '../components/blogs/FirstBlogs'
import SecondBlogs from '../components/blogs/SecondBlogs'
import ThirdBlogs from '../components/blogs/ThirdBlogs'


const Blog = () => {
  return (
    <div className='blog-page'>
     <Breadcrumb/>
     <div className="blogs-title">
      <h1>CONCEPT'S Beauty Blogs</h1>
     </div>
     <FirstBlogs/>
     <SecondBlogs/>
     <ThirdBlogs/>
    </div>
  )
}

export default Blog
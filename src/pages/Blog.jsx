import React, { useContext } from 'react'
import Breadcrumb from '../components/Global/breadcrumb/BreamCrumb'
import FirstBlogs from '../components/blogs/FirstBlogs'
import SecondBlogs from '../components/blogs/SecondBlogs'
import ThirdBlogs from '../components/blogs/ThirdBlogs'
import { LanguageContext } from '../context/LanguageProvider'
const Blog = () => {
  const {t} = useContext(LanguageContext);
  return (
    <div className='blog-page'>
     <Breadcrumb/>
     <div className="blogs-title">
      <h1>{t("blogs.heading")}</h1>
     </div>
     <FirstBlogs/>
     <SecondBlogs/>
     <ThirdBlogs/>
    </div>
  )
}

export default Blog
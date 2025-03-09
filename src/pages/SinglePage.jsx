import React from 'react'
import SingleProduct from '../components/singlepage/SingleProduct'
import ProductInfo from '../components/singlepage/ProductInfo'
import Reviews from '../components/singlepage/Reviews'
import YouMayAlsoLike from '../components/singlepage/YouMayAlsoLike'

const SinglePage = () => {
  return (
    <>
    <SingleProduct/>
    <ProductInfo/>
    <Reviews/>
    <YouMayAlsoLike/>
    </>
  )
}

export default SinglePage
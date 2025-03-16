import React from 'react'
import Completed from '../components/checkout/Completed'
import RecommendedProducts from '../components/checkout/RecommendedProducts'

const OrderCompleted = () => {
  return (
    <div className='order-completed'>
        <Completed/>
        <RecommendedProducts/>
    </div>
  )
}

export default OrderCompleted
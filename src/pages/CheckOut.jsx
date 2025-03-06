import React from 'react'
import { SlBasketLoaded } from 'react-icons/sl'

import Basket from '../components/checkout/Basket'
import Form from '../components/checkout/Form'

const CheckOut = () => {
  return (
    <div className='check-out'>
      <div className="top">
          <h3>Concept</h3>
          <SlBasketLoaded className='icon'/>
      </div>
      <div className="bottom">
      <div className="left"><Form/></div>
      <div className="right"><Basket/></div>
      </div>
    </div>
  )
}

export default CheckOut
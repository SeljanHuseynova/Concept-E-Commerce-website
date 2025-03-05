import React from 'react';
import collection from '../../assets/images/general/collection-enchante.webp';
import { Link } from 'react-router-dom';
import EnhanceProducts from './EnhanceProducts';

const EnhanceCollection = () => {
  return (
    <div className='enhance-collection'>
      <h2>Enchanté Collection</h2>
      <div className="main">
        <div className="left">
          <div className="content">
          <h1>Unleash Your Beauty with LAORIV Cosmetics</h1>
          <p>Dive into a world of limitless possibilities as we unveil a range of vibrant colors, luxurious textures, and cutting-edge formulas.</p>
          <p>Get ready to transform your makeup game and embrace the extraordinary with our latest collection.</p>
         <Link to='/products' className='link'>EXPLORE THE COLLECTION</Link>
         </div>
        </div>
        <div className="right">
          <img src={collection} alt="enchante-collection-photo" />
        </div>
      </div>
      <div className="products">
        <EnhanceProducts/>
      </div>
    </div>
  )
}

export default EnhanceCollection
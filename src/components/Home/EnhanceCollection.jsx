import React, { useContext } from 'react';
import collection from '../../assets/images/general/collection-enchante.webp';
import { Link } from 'react-router-dom';
import EnhanceProducts from './EnhanceProducts';
import { LanguageContext } from '../../context/LanguageProvider';


const EnhanceCollection = () => {
  const {t} = useContext(LanguageContext);
  return (
    <div className='enhance-collection'>
      <h2>{t("home.enchance.collection")}</h2>
      <div className="main">
        <div className="left">
          <div className="content">
          <h1>{t("home.enchance.heading")}</h1>
          <p>{t("home.enchance.first-paragraph")}</p>
          <p>{t("home.enchance.second-paragraph")}</p>
         <Link to='/products' className='link'>{t("home.enchance.button")}</Link>
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
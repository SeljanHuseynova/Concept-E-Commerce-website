import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LanguageContext } from '../../context/LanguageProvider';

const NewCustomers = () => {
  const {t}= useContext(LanguageContext);
  const location = useLocation();
  return (
    <div className="new-customers-container">
      <div className='new-customers'>
        <h5>{t("account.new")}</h5>
        <span>{t("account.p")}</span>
        <ul>
          <li>{t("account.li-1")}</li>
          <li>{t("account.li-2")}</li>
          <li>{t("account.li-3")}</li>
          <li>{t("account.li-4")}</li>
          <li>{t("account.li-5")}</li>
        </ul>
        {location.pathname !== '/register' && (
          <Link to='/register' className='link'>{t("account.button")}</Link>
        )}
      </div>
    </div>
  )
}

export default NewCustomers

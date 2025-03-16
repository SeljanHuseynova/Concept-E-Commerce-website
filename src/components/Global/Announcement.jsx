import React, { useContext } from 'react'
import { LanguageContext } from '../../context/LanguageProvider';

const Announcement = () => {
    const {t} = useContext(LanguageContext);
  return (
    <div className='announcement'>
      <span> {t("nav.announcement")}</span>
    </div>
  )
}

export default Announcement
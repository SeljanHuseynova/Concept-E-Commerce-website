import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LanguageContext } from '../../context/LanguageProvider';

const ContactForm = ({ currentUser }) => {
  const {t} = useContext(LanguageContext);
  const [formData, setFormData] = useState({
    name: currentUser ? currentUser.name : '',
    email: '',
    phone: '',
    company: '',
    comment: '',
  });

  const [phoneError, setPhoneError] = useState('');

  const phoneRegex = /^\+994\d{9}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'phone') {
      if (!phoneRegex.test(value)) {
        setPhoneError('Invalid phone number. Format: +994XXXXXXXXX');
      } else {
        setPhoneError('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill the required fields!');
      return;
    }
    if (phoneError) return;

    toast.success('Your message has been sent successfully!');

    setFormData({
      name: currentUser ? currentUser.name : '',
      email: '',
      phone: '',
      company: '',
      comment: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='part'>
        <label>{t("contact.name")}<span>{t("contact.required")}</span></label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className='part'>
        <label>{t("contact.email")}<span>{t("contact.required")}</span></label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className='part'>
        <label>{t("contact.phone")}<span>{t("contact.required")}</span></label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        {phoneError && <span className="error">{phoneError}</span>}
      </div>
      <div className='part'>
        <label>{t("contact.company")}</label>
        <input type="text" name="company" value={formData.company} onChange={handleChange} />
      </div>
      <div className='part'>
        <label>{t("contact.comment")}</label>
        <textarea className='comment'type="text" name="comment" value={formData.comment} onChange={handleChange} />
      </div>
      <button type="submit">{t("contact.submit")}</button>
    </form>
  );
};

export default ContactForm;

import React, { useContext, useState } from 'react'
import { SlBasketLoaded } from 'react-icons/sl'
import Basket from '../components/checkout/Basket'
import Form from '../components/checkout/Form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { clearAll, updateStockAfterPurchase } from '../redux/accountSlice'
import Swal from "sweetalert2";
import { LanguageContext } from '../context/LanguageProvider'
const CheckOut = () => {
  const {t} = useContext(LanguageContext);
  const currentUser = useSelector((state) => state.users.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const [formData, setFormData] = useState({
      region: "",
      firstName: "",
      secondName: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      postalCode: "",
      shippingMethod: "",
      payment: "",
      billing: "",
    });
    const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key].trim()) {
        newErrors[key] = t("checkout.error");
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (!currentUser?.cart?.length) {
      alert("Basket is emphty!");
      return;
    }
    dispatch(updateStockAfterPurchase(currentUser.id))
      .unwrap()
      .then(() => {
        dispatch(clearAll(currentUser.id));
        navigate("/order-completed");
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error!',
          text: `Something went wrong. ${error}.`,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  };
  return (
    <div className='check-out'>
      <div className="top">
          <Link to='/' className='link'>Concept</Link>
          <SlBasketLoaded className='icon'/>
      </div>
      <div className="bottom">
      <div className="left"><Form handleSubmit={handleSubmit} formData={formData} handleChange={handleChange} errors={errors}/></div>
      <div className="right"><Basket/></div>
      </div>
    </div>
  )
}

export default CheckOut
import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { accountUrl, headers } from "../supabase";
import AdressModal from "../components/modals/AdressModal";
import BreamCrumb from "../components/Global/breadcrumb/BreamCrumb";
import { LanguageContext } from "../context/LanguageProvider";

const Adresses = () => {
  const {t} = useContext(LanguageContext);
  const [adresses, setAdresses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAdress, setSelectedAdress] = useState(null);

  const id = useSelector((state) => state.users?.currentUser?.id);

  useEffect(() => {
    const fetchAdresses = async () => {
      try {
        const response = await axios.get(
          `${accountUrl}?id=eq.${id}&select=adress`,
          { headers }
        );

        const adressArray =
          response.data.length > 0 ? response.data[0].adress : [];
        setAdresses(adressArray);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    if (id) {
      fetchAdresses();
    }
  }, [id]);

  const openModal = (adress = null) => {
    setSelectedAdress(adress);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAdress(null);
  };

  const deleteAdress = async (adressToDelete) => {
    try {
      const updatedAdresses = adresses.filter((adr) => adr !== adressToDelete);
      await axios.patch(
        `${accountUrl}?id=eq.${id}`,
        { adress: updatedAdresses },
        { headers }
      );
      setAdresses(updatedAdresses);
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  return (
    <>
      <BreamCrumb />
      <div className="addresses">
        <h2>{t("account.addresses")}</h2>
        <button onClick={() => openModal()} className="add-btn">
        {t("account.add-address")}
        </button>

        {adresses.length && (
          <ul>
            {adresses.map((adress, index) => (
              <li key={index}>
                <div className="address"> {adress}</div>
                <div className="buttons">
                  <button onClick={() => openModal(adress)} className="edit">
                  {t("account.edit")}
                  </button>
                  <button
                    onClick={() => deleteAdress(adress)}
                    className="delete"
                  >
                    {t("account.delete")}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {modalOpen && (
          <AdressModal
            closeModal={closeModal}
            selectedAdress={selectedAdress}
            setAdresses={setAdresses}
          />
        )}
      </div>
    </>
  );
};

export default Adresses;

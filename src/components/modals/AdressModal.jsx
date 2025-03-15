import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { accountUrl,headers } from '../../supabase'

const AdressModal = ({ closeModal, selectedAdress, setAdresses }) => {
  const [adressText, setAdressText] = useState(selectedAdress || "");
  const id = useSelector((state) => state.users?.currentUser?.id);

  const handleSubmit = async () => {
    try {
      let updatedAdresses;
      
      if (selectedAdress) {
        // Edit existing address
        updatedAdresses = (await axios.get(`${accountUrl}?id=eq.${id}&select=adress`, { headers }))
          .data[0].adress.map((adr) => (adr === selectedAdress ? adressText : adr));
      } else {
        // Add new address
        const response = await axios.get(`${accountUrl}?id=eq.${id}&select=adress`, { headers });
        const currentAdresses = response.data[0]?.adress || [];
        updatedAdresses = [...currentAdresses, adressText];
      }

      // Update in database
      await axios.patch(`${accountUrl}?id=eq.${id}`, { adress: updatedAdresses }, { headers });

      // Update local state
      setAdresses(updatedAdresses);
      closeModal();
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div className="adress-modal-overlay">
    <div className="adress-modal">
      <h3>{selectedAdress ? "Edit Address" : "Add Address"}</h3>
      <input
        type="text"
        value={adressText}
        onChange={(e) => setAdressText(e.target.value)}
        placeholder="Enter address"
      />
      <button onClick={handleSubmit}>{selectedAdress ? "Save" : "Add"}</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
    </div>
  );
};

export default AdressModal;

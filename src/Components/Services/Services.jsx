import React, { useState } from 'react';
import './Services.css';
import { useNavigate } from 'react-router-dom';
import PaymentConfirmationModal from './PaymentConfirmationModal'; // import the modal
import { BACKEND_URI, FRONTEND_URI } from '../../config';
import Cookies from 'js-cookie';

const Services = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const apiUrl = BACKEND_URI;
  const frontUrl = FRONTEND_URI;
  const handleCardClick = (packageId) => {
    setSelectedPackage(packageId);
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const handleConfirmPayment = () => {
    
    fetch(`${apiUrl}/call_tbcpay`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: "create_payment",
        packageId: selectedPackage,
        returnurl: `${frontUrl}/chat`,
        email: Cookies.get('email')
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error);
      }

      const pay_token = data.payId;
      Cookies.set('pay_token', pay_token, {expires: 7});

      const approvalUrl = data.links.find(link => link.rel === "approval_url").uri;
      setTimeout(() => {
      window.location.href = approvalUrl;

      }, 3000)
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Payment failed: ' + error.message);
    })
    .finally(() => {
      handleCloseModal();
    });
  };

  return (
    <div className="card-container">
      <div className="card" onClick={() => handleCardClick(1)}>
        <h2>Package 1</h2>
        <p>10 GEL - 30 minutes</p>
        <h3>Purchase</h3>
      </div>
      <div className="card" onClick={() => handleCardClick(2)}>
        <h2>Package 2</h2>
        <p>50 GEL - 90 minutes</p>
        <h3>Purchase</h3>
      </div>
      <div className="card" onClick={() => handleCardClick(3)}>
        <h2>Package 3</h2>
        <p>80 GEL - 120 minutes</p>
        <h3>Purchase</h3>
      </div>
      <PaymentConfirmationModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmPayment}
      />
    </div>
  );
};

export default Services;

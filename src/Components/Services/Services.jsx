import React, { useState } from 'react';
import './Services.css';
import { useNavigate } from 'react-router-dom';
import PaymentConfirmationModal from './PaymentConfirmationModal'; // import the modal

const Services = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (packageId) => {
    setSelectedPackage(packageId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const handleConfirmPayment = () => {
    fetch('http://localhost:5000/call_tbcpay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: "create_payment",
        packageId: selectedPackage,
        returnurl: 'http://localhost:5173/chat' // replace with your actual return URL
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error);
      }
      console.log('Payment response:', data);
      const approvalUrl = data.links.find(link => link.rel === "approval_url").uri;
      window.location.href = approvalUrl;
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

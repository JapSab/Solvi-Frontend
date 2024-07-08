import React from 'react';
import './Services.css';
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const navigate = useNavigate();

    const handleCardClick = (totalAmount) => {
        const amount = {
            currency: "GEL",
            total: totalAmount,
            subTotal: 0,
            tax: 0,
            shipping: 0
        };

        fetch('http://localhost:5000/call_tbcpay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: "create_payment",
                amount: amount,
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
            // console.log(data.payId);
            window.location.href = approvalUrl;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Payment failed: ' + error.message);
        });
    };

    return (
        <div className="card-container">
        <div className="card" onClick={() => handleCardClick(0.1)}>
            <h2>Package 1</h2>
            <p>10 GEL - 30 minutes</p>
            <h3>Purchase</h3>
        </div>
        <div className="card" onClick={() => handleCardClick(50)}>
            <h2>Package 2</h2>
            <p>50 GEL - 90 minutes</p>
            <h3>Purchase</h3>
        </div>
        <div className="card" onClick={() => handleCardClick(80)}>
            <h2>Package 3</h2>
            <p>80 GEL - 120 minutes</p>
            <h3>Purchase</h3>
        </div>
    </div>
);
};

export default Services;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Assuming you are using js-cookie for managing cookies
import Navbar from '../Navbar/Navbar';
import ChatterPage from '../Chat/ChatterPage';
import { BACKEND_URI } from '../../config';

function ChattingPage() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      const payToken = Cookies.get('pay_token');
      if (!payToken) {
        navigate('/services');
        return;
      }
      try {
        const response = await fetch(`${BACKEND_URI}/call_tbcpay`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'get_payment',
            email: Cookies.get('email'),
            payment_id: Cookies.get('pay_token'), // Example data, replace with actual data
          }),
        });

        const data = await response.json();
        if (data.Succeeded) {
          setLoading(false);
          Cookies.remove('pay_token');
        } else {
          navigate('/services');
        }
      } catch (error) {
        console.error('Error checking access:', error);
        navigate('/services');
      }
    };

    checkAccess();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <ChatterPage />
    </div>
  );
}

export default ChattingPage;

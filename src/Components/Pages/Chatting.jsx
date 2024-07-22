import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Assuming you are using js-cookie for managing cookies
import Navbar from '../Navbar/Navbar';
import ChatterPage from '../Chat/ChatterPage';
import { BACKEND_URI } from '../../config';

function ChattingPage() {
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      const chatCookie = Cookies.get('chat_cookie');
      if (chatCookie) {
        setHasAccess(true); // Chat cookie found, allow rendering of the page
        return;
      }

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
            payment_id: payToken, // Example data, replace with actual data
          }),
        });

        const data = await response.json();

        if (data.status === "Succeeded") {
          Cookies.set('chat_cookie', 'true', { expires: 1 }); // Set chat_cookie with a 1-day expiration
          setHasAccess(true); // Update state to trigger re-render
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

  if (!hasAccess) {
    return null; // Do not render anything until checkAccess runs
  }

  return (
    <div>
      <Navbar />
      <ChatterPage />
    </div>
  );
}

export default ChattingPage;

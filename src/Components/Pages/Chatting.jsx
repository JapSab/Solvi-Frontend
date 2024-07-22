import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Assuming you are using js-cookie for managing cookies
import Navbar from '../Navbar/Navbar';
import ChatterPage from '../Chat/ChatterPage';
import { BACKEND_URI } from '../../config';

function ChattingPage() {
  const [hasAccess, setHasAccess] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(10);
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
          Cookies.set('chat_cookie', 'true', { expires: 0.0208333 }); // Set chat_cookie with a 30-second expiration
          setHasAccess(true); // Update state to trigger re-render
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

  useEffect(() => {
    const checkCookieExpiration = setInterval(() => {
      const chatCookie = Cookies.get('chat_cookie');
      if (!chatCookie && hasAccess) {
        setShowPopup(true); // Show popup if chat_cookie is expired
      }
    }, 1000); // Check every second

    return () => clearInterval(checkCookieExpiration);
  }, [hasAccess]);

  useEffect(() => {
    if (showPopup) {
      const timer = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            Cookies.remove('access_token');
            navigate('/services'); // Redirect to the main page after countdown reaches 0
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000); // Countdown every second

      return () => clearInterval(timer);
    }
  }, [showPopup, navigate]);

  if (!hasAccess) {
    return null; // Do not render anything until checkAccess runs
  }

  return (
    <div>
      <Navbar />
      <ChatterPage />
      {showPopup && (
        <div style={popupStyle}>
          <p>The chat is over. Redirecting to the main page in {countdown} seconds...</p>
        </div>
      )}
    </div>
  );
}

const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  border: '2px solid #605DEC',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  zIndex: 1000, // Ensure the popup overlays the whole website
};

export default ChattingPage;

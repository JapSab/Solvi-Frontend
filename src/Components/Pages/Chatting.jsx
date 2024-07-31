import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
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
        setHasAccess(true);
        return;
      }

      const payToken = Cookies.get('pay_token');
      console.log('Pay token:', payToken);
      if (!payToken) {
        console.log('No pay token found, redirecting to /services');
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
            payment_id: payToken,
          }),
        });

        const data = await response.json();

        if (data.status === "Succeeded") {
          Cookies.set('chat_cookie', 'true', { expires: 0.0208333 }); // 30 minutes expiration
          setHasAccess(true);
          Cookies.remove('pay_token');
        } else {
          console.log('Payment not succeeded, redirecting to /services');
          Cookies.remove('access_token');
          navigate('/services');
        }
      } catch (error) {
        console.error('Error checking access:', error);
        Cookies.remove('access_token');
        navigate('/services');
      }
    };

    checkAccess();
  }, [navigate]);

  useEffect(() => {
    const checkCookieExpiration = setInterval(() => {
      const chatCookie = Cookies.get('chat_cookie');
      console.log('Checking chat cookie expiration:', chatCookie);
      if (!chatCookie && hasAccess) {
        setShowPopup(true);
      }
    }, 1000);

    return () => clearInterval(checkCookieExpiration);
  }, [hasAccess]);

  useEffect(() => {
    if (showPopup) {
      const timer = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown <= 10) {
            Cookies.remove('access_token');
          if (prevCountdown <= 1) {
            clearInterval(timer);
            Cookies.remove('access_token');
            navigate('/services');
            return 0;
          }
        }
          return prevCountdown - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showPopup, navigate]);

  if (!hasAccess) {
    return null;
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
  zIndex: 1000,
};

export default ChattingPage;

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const useAuthCheck = (endpoint) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthorized, setIsAuthorized] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuthorization = async () => {
//       try {
//         const response = await fetch(endpoint, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//               action: "get_payment",
//               email: Cookies.get('email'),
//               payment_id: Cookies.get('pay_token')
//             })
//         });
//         const result = await response.json();
//         Cookies.remove('pay_token');
//         if (result.Succeeded) {
//           setIsAuthorized(true);
//         } else {
//           navigate('/services'); // or any other route you want to redirect unauthorized users to
//         }
//       } catch (error) {
//         console.error('Error checking authorization:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAuthorization();
//   }, [endpoint, navigate]);

//   return { isLoading, isAuthorized };
// };

// export default useAuthCheck;

// utils/checkChatEligibility.js


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { BACKEND_URI } from '../../config';
// const withAuth = (WrappedComponent) => {
//   return (props) => {
//     const apiUrl = BACKEND_URI
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//       const checkAccess = async () => {
//         try {
//           const response = await fetch(`${apiUrl}/call_tbcpay`, {
//             method: 'POST', // Use POST if you are sending data
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               action: "get_payment",
//               email: Cookies.get('email'),
//               payment_id: Cookies.get('pay_token') // Example data, replace with actual data
//             }),
//           });

//           const data = await response.json();
//           Cookies.remove('pay_token');
//           if (data.Succeeded) {
//             setLoading(false);
//           } else {
//             navigate('/services');
//           }
//         } catch (error) {
//           console.error('Error checking access:', error);
//           navigate('/services');
//         }
//       };

//       checkAccess();
//     }, [navigate]);

//     if (loading) {
//       return <div>Loading...</div>;
//     }

//     return <WrappedComponent {...props} />;
//   };
// };

// export default withAuth;

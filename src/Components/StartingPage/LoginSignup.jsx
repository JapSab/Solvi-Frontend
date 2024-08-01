import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import backgroundImage from '../../images/Background.png';
import LanguageContext from '../../utils/LanguageContext';

export default function LoginSignup() {
  const isAuthenticated = Boolean(localStorage.getItem('auth-token'));
  const { language } = useContext(LanguageContext);

  const content = {
    ENG: {
      title: 'Hello, lawyer is listening',
      button: 'Ask a question'
    },
    GEO: {
      title: 'გამარჯობა, იურისტი გისმენთ',
      button: 'დასვი შეკითხვა'

    },
  };


  return (
    <div>
      <div style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px', // Adjust the height as needed
        width: '100%', // This makes the div stretch across the width of its container
        marginTop:50
      }}></div>
      <h2 style={{ textAlign: 'center' }}>{content[language].title}</h2>

      <Box 
        display="flex" 
        justifyContent="center" 
        flexDirection="row" 
        gap={2} 
        marginTop={5}
      >
        {isAuthenticated ? (
          <Button 
            variant="contained" 
            sx={{ 
              fontFamily: '"Poppins", sans-serif', 
              height:60,
              fontWeight: 'normal', 
              fontSize: 18, 
              width: 150, 
              borderRadius: 30,
              backgroundColor: '#841E60', 
              color: 'white',
              boxShadow:0,
              '&:hover': {
                backgroundColor: '#EB7745' // Adjust hover color as needed
              }
            }}
            onClick={() => window.location.href = '/services'} // For the Services button
          >
            Services
          </Button>
        ) : (
          <>
            <Button 
              variant="contained" 
              sx={{ 
                fontFamily: '"Poppins", sans-serif', 
                height:60,
                fontWeight: 'normal', 
                fontSize: 18, 
                width: 200, 
                borderRadius: 30,
                backgroundColor: '#841E60', 
                color: 'white',
                boxShadow:0,
                '&:hover': {
                  backgroundColor: '#EB7745' // Adjust hover color as needed
                }
              }}
              onClick={() => window.location.href = '/registration'} // For the Sign Up button
            >
              {content[language].button}
            </Button>
         
          </>
        )}
      </Box>
    </div>
  );
}

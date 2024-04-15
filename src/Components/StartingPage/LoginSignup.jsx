import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import backgroundImage from '../../images/Background.png'

export default function LoginSignup() {

 
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
      <h2 style={{textAlign:'center'}}>გამარჯობა, იურისტი გისმენთ</h2>

      <Box 
        display="flex" 
        justifyContent="center" 
        flexDirection="row" 
        gap={2} 
        marginTop={5}
      >
        <Button 
          variant="contained" 
          sx={{ 
            fontFamily: '"Poppins", sans-serif', 
            height:60,
            fontWeight: 'normal', 
            fontSize: 18, 
            width: 150, 
            borderRadius: 30,
            backgroundColor: '#605DEC', 
            color: 'white',
            boxShadow:0
          }}
          onClick={() => window.location.href = '/registration'} // For the Sign In button


        >
          Sign in 
        </Button>
        <Button 
          variant="contained" 
          sx={{ 
            fontFamily: '"Poppins", sans-serif', 
            fontWeight: 'normal', 
            height:60,
            fontSize: 18, 
            width: 150, 
            borderRadius: 30,
            backgroundColor: '#605DEC', 
            color: 'white',
            boxShadow:0
          }}
          onClick={() => window.location.href = '/login'} // For the Sign In button

        >
          Log In
        </Button>
      </Box>
    </div>
  );
}

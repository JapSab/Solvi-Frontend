import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function SubscriptionPage() {
  // Inline CSS styles for the circles
  const circleContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', // Adjusted to fit screen width
  };

  const circleStyle = {
    position: 'relative',
    width: '500px', // Diameter of the inner circle
    height: '500px', // Diameter of the inner circle
    borderRadius: '50%', // This makes the shape a circle
    margin: '40px auto 20px', // Center horizontally and add spacing
    backgroundColor: '#fff', // White color for inner circle
    boxShadow: '0px 0px 0px 20px rgba(255, 255, 255, 0.4)', // Half-transparent white circle
  };

  const innerCircleStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Diameter of the innermost circle
    height: '90%', // Diameter of the innermost circle
    backgroundColor: '#605DEC',
    borderRadius: '50%', // This makes the shape a circle
  };

  // Inline CSS styles for the text
  const textStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center', // Center the text horizontally
    color: 'white', // Text color
    fontFamily: '"Poppins", sans-serif', // Consistent font family
    fontSize:'20px'
  };

  return (
    <div>
      <Fab aria-label="add"
          style={{ marginTop: 10, marginLeft: 20, boxShadow: 'none', backgroundColor: '#f6f5f800', color: '#461646' }}
          onClick={() => window.history.back()}
      >
        <ArrowBackIcon/>
      </Fab>


      {/* Circle with text */}
      <div style={circleContainerStyle}>
        <div style={circleStyle}>
          <div style={innerCircleStyle}></div>
          <div style={textStyle}>
            <h3>Packages</h3>
            <br></br>
            <p>30წთ - 10GEL</p>
            <p>90წთ - 50GEL</p>
            <p>120წთ - 80GEL</p>
          </div>
        </div>
      </div>

      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button variant="contained" sx={{ 
            fontFamily: '"Poppins", sans-serif', 
            fontWeight: 'normal', 
            fontSize: 18, 
            width: 350, 
            borderRadius: 30, 
            backgroundColor: '#605DEC',
            '&:hover': {
              backgroundColor: '#605DEC'
            } 
        }}
        >
          Continue {'>'}
        </Button>
      </Box>
    </div>
  );
}

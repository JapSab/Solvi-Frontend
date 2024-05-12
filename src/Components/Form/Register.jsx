import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import GoogleIcon from '@mui/icons-material/Google';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MobileVerification from './MobileVerification';

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}
function validateNumber(number) {
  return number.length == 9;
}

export default function RegistrationForms() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [number, setNumber] = React.useState('');

  const [errors, setErrors] = React.useState({ email: false, password: false });
  const [currentStage, setCurrentStage] = React.useState('register'); // 'register' or 'verify'


  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setErrors({ ...errors, email: !validateEmail(newEmail) });
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setErrors({ ...errors, password: !validatePassword(newPassword) });
  };

  const handleNumberChange = (event) => {
    const newNumber = event.target.value;
    setNumber(newNumber);
    setErrors({ ...errors, number: !validateNumber(newNumber) });
  };

  // const handleContinue = () => {
  //   if (!errors.email && !errors.password && email && password) {
  //     setCurrentStage('verify');
  //   }
  // };

  const handleContinue = async () => {
    if (!errors.email && !errors.password && email && password) {
      const url = "http://localhost:5000/api/client/register";  // Your API endpoint
      const data = {
        email: email,
        password: password,
        phone: number,
        // Include other fields if necessary
      };
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const responseData = await response.json();
        console.log('Registration successful:', responseData);
        setCurrentStage('verify');  // Move to verification stage if registration is successful
      } catch (error) {
        console.error('Failed to register:', error);
      }
    }
  };
  
  const handleVerificationComplete = (code) => {
    console.log("Verification Code:", code);  // Handle verification logic here
  };

  if (currentStage === 'verify') {
    return (
      <div>
         <Fab aria-label="add"
        style={{ marginTop:10,marginLeft:20 ,boxShadow:'none', backgroundColor: '#f6f5f800', color: '#605DEC' }} // Customize background and icon color here
        onClick={() => window.history.back()}
         >
          <ArrowBackIcon/>
        </Fab>
        <Typography variant="h5" textAlign="center" marginTop={30}>Enter a One-Time code</Typography>
        <br/>
        <Typography variant="h6" textAlign="center">You will receive a one-time code on the specified number </Typography>
        <br/>
        <MobileVerification />
      </div>
    );
  }

  return (
    <div>

      <Fab aria-label="add"
        style={{ marginTop:10,marginLeft:20 ,boxShadow:'none', backgroundColor: '#f6f5f800', color: '#605DEC' }} // Customize background and icon color here
        onClick={() => window.history.back()}
      >
        <ArrowBackIcon/>
      </Fab>

      <h2 style={{marginTop:80, textAlign: 'center', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal'}}>Registration</h2>

     
       <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" marginTop={5} gap={2}>
       <TextField
          id="email"
          label="E-mail"
          variant="outlined"
          sx={{ width: 350, borderRadius: 3 }}
          value={email}
          onChange={handleEmailChange}
          error={errors.email}
          helperText={errors.email ? 'Invalid email address' : ''}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          sx={{ width: 350, borderRadius: 3 }}
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={errors.password}
          helperText={errors.password ? 'Password must be at least 6 characters' : ''}
        />
        <TextField id="confirm-password" label="Mobile Number" variant="outlined" sx={{ width: 350, borderRadius: 3 }}
        onChange={handleNumberChange}
        />
      </Box>

      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button variant="contained" sx={{ 
            fontFamily: '"Poppins", sans-serif', 
            fontWeight: 'normal', 
            fontSize: 18, 
            width: 350, 
            borderRadius: 30, 
            backgroundColor:'#605DEC',
            '&:hover': {
              backgroundColor: '#2b0f2b' // darker purple color on hover
            } 
          }}
          onClick={handleContinue}
        >
            Continue {'>'}</Button>
      </Box>

      <Box display="flex" justifyContent="center" marginTop={2}>
        <Typography variant="body2">
          Don't have an account? <a href="#" style={{ color: '#605DEC', textDecoration: 'none' }}>Log in</a>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button 
          variant="contained" 
          sx={{ 
            fontFamily: '"Poppins", sans-serif', 
            height:60,
            fontWeight: 'normal', 
            fontSize: 18, 
            width: 350, 
            borderRadius: 30,
            backgroundColor: 'white', 
            color: 'black',
            boxShadow:0
          }}
          startIcon={<FacebookIcon sx={{color:'#1877F2'}}/>} // Assuming you have a Google icon component
        >
          Sign in with Facebook
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button 
          variant="contained" 
          sx={{ 
            fontFamily: '"Poppins", sans-serif', 
            fontWeight: 'normal', 
            height:60,
            fontSize: 18, 
            width: 350, 
            borderRadius: 30,
            backgroundColor: 'white', 
            color: 'black',
            boxShadow:0
          }}
          startIcon={<GoogleIcon sx={{color:'#DB4437'}}/>} // Assuming you have a Google icon component
        >
          Sign in with Google
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button 
          variant="contained" 
          sx={{ 
            fontFamily: '"Poppins", sans-serif', 
            fontWeight: 'normal', 
            height:60,
            fontSize: 18, 
            width: 350, 
            borderRadius: 30,
            backgroundColor: 'white', 
            color: 'black',
            boxShadow:0
          }}
          startIcon={<AppleIcon sx={{color:'#000000'}}/>} // Assuming you have a Google icon component
        >
          Sign in with Apple
        </Button>
      </Box>
    </div>
  );
}

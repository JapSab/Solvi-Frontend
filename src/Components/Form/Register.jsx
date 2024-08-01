import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URI } from '../../config';
import LanguageContext from '../../utils/LanguageContext';

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateNumber(number) {
  return number.length === 9;
}

const CustomInput = ({ id, placeholder, type, value, onChange, error, helperText }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '350px', marginBottom: '16px' }}>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        padding: '12px',
        borderRadius: '4px',
        border: error ? '1px solid red' : '1px solid #ccc',
        fontSize: '16px',
        backgroundColor: 'transparent',
        outline: 'none',
        boxShadow: 'none',
        height:'30px'
      }}
    />
    {error && <span style={{ color: 'red', fontSize: '12px' }}>{helperText}</span>}
  </div>
);

export default function RegistrationForms() {
  const apiUrl = BACKEND_URI;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [number, setNumber] = React.useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({ email: false, password: false, number: false });
  const { language } = useContext(LanguageContext);

    const content = {
      ENG: {
        title: 'Register',
        continue: "continue",
        redirect1: "Already have an account?",
        redirect2: "Log in",
      },
      GEO: {
        title: 'რეგისტრაცია',
        continue: 'გაგრძელება',
        redirect1: "შექმნილი გაქვთ ანგარიში?",
        redirect2: "შესვლა",
    
      },
    };

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

  const handleContinue = async () => {
    if (!errors.email && !errors.password && !errors.number && email && password && number) {
      const url = `${apiUrl}/api/client/register`;  // Your API endpoint
      const data = {
        email: email,
        password: password,
        phone: number,
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
        navigate('/login');  // Redirect to login page if registration is successful
      } catch (error) {
        console.error('Failed to register:', error);
      }
    }
  };

  return (
    <div>
      <Fab aria-label="add"
        style={{ marginTop: 10, marginLeft: 20, boxShadow: 'none', backgroundColor: '#f6f5f800', color: '#841E60' }}
        onClick={() => window.history.back()}
      >
        <ArrowBackIcon />
      </Fab>

      <h2 style={{ marginTop: 150, textAlign: 'center', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal' }}>{content[language].title}</h2>

      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" marginTop={5} gap={2}>
        <CustomInput
          id="email"
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={errors.email}
          helperText={errors.email ? 'Invalid email address' : ''}
        />
        <CustomInput
          id="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          error={errors.password}
          helperText={errors.password ? 'Password must be at least 6 characters' : ''}
        />
        <CustomInput
          id="number"
          placeholder="Mobile Number"
          type="text"
          value={number}
          onChange={handleNumberChange}
          error={errors.number}
          helperText={errors.number ? 'Mobile number must be 9 digits' : ''}
        />
      </Box>

      <Box display="flex" justifyContent="center" marginTop={2}>
        <Button variant="contained" sx={{
          fontFamily: '"Poppins", sans-serif',
          fontWeight: 'normal',
          fontSize: 18,
          width: 350,
          borderRadius: 30,
          backgroundColor: '#841E60',
          '&:hover': {
            backgroundColor: '#EB7745' 
          }
        }}
          onClick={handleContinue}
        >
          {content[language].continue} {'>'}
        </Button>
      </Box>

      <Box display="flex" justifyContent="center" marginTop={2}>
        <Typography variant="body2"
          onClick={() => navigate('/login')} >

          {content[language].redirect1} <a href="#" style={{ color: '#841E60', textDecoration: 'none' }}>{content[language].redirect2}</a>
        </Typography>
      </Box>
      {/* <Box display="flex" justifyContent="center" marginTop={2}>
        <Button
          variant="contained"
          sx={{
            fontFamily: '"Poppins", sans-serif',
            height: 60,
            fontWeight: 'normal',
            fontSize: 18,
            width: 350,
            borderRadius: 30,
            backgroundColor: 'white',
            color: 'black',
            boxShadow: 0
          }}
          startIcon={<FacebookIcon sx={{ color: '#1877F2' }} />}
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
            height: 60,
            fontSize: 18,
            width: 350,
            borderRadius: 30,
            backgroundColor: 'white',
            color: 'black',
            boxShadow: 0
          }}
          startIcon={<GoogleIcon sx={{ color: '#DB4437' }} />}
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
            height: 60,
            fontSize: 18,
            width: 350,
            borderRadius: 30,
            backgroundColor: 'white',
            color: 'black',
            boxShadow: 0
          }}
          startIcon={<AppleIcon sx={{ color: '#000000' }} />}
        >
          Sign in with Apple
        </Button>
      </Box> */}
    </div>
  );
}

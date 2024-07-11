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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext'; // Adjust the path accordingly
import { BACKEND_URI } from '../../config';
import Cookies from 'js-cookie';

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

export default function LoginForms() {
    const navigate = useNavigate();
    const apiUrl = BACKEND_URI;
    const { login } = useAuth(); // Get the login function from AuthContext
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errors, setErrors] = React.useState({ email: false, password: false });

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

    const handleLogin = async () => {
        if (!validateEmail(email) || !validatePassword(password)) {
            alert('Please enter valid email and password.');
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}/api/client/login`, {
                email: email,
                password: password
            });
            login(response.data.token);
            Cookies.set('email', email);

            navigate('/services'); // Redirect to /services after successful login
        } catch (error) {
            if (error.response) {
                console.error('Error:', error.response.data);
                alert(error.response.data.error);
            } else if (error.request) {
                console.error('Error', error.request);
            } else {
                console.error('Error', error.message);
            }
        }
    };

    return (
        <div>
            <Fab 
                aria-label="add"
                style={{ marginTop: 10, marginLeft: 20, boxShadow: 'none', backgroundColor: '#f6f5f800', color: '#461646' }}
                onClick={() => window.history.back()}
            >
                <ArrowBackIcon/>
            </Fab>

            <h2 style={{ marginTop: 80, textAlign: 'center', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal' }}>Log in</h2>

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
            </Box>

            <Box display="flex" justifyContent="center" marginTop={2}>
                <Button 
                    variant="contained"
                    onClick={handleLogin}
                    sx={{ 
                        fontFamily: '"Poppins", sans-serif', 
                        fontWeight: 'normal', 
                        fontSize: 18, 
                        width: 350, 
                        borderRadius: 30, 
                        backgroundColor: '#605DEC',
                        '&:hover': { backgroundColor: '#605DEC' } 
                    }}
                >
                    Continue {'>'}
                </Button>
            </Box>

            <Box display="flex" justifyContent="center" marginTop={2}>
                <Typography 
                    variant="body2"
                    onClick={() => navigate('/registration')} 
                >
                    Don't have an account? <a href="#" style={{ color: '#461646', textDecoration: 'none' }}>Register</a>
                </Typography>
            </Box>

            <Box display="flex" justifyContent="center" marginTop={2}>
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
                    startIcon={<FacebookIcon sx={{ color: '#1877F2' }}/>} 
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
                        fontSize: 18, 
                        width: 350, 
                        borderRadius: 30,
                        backgroundColor: 'white', 
                        color: 'black',
                        boxShadow: 0
                    }}
                    startIcon={<GoogleIcon sx={{ color: '#DB4437' }}/>} 
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
                        fontSize: 18, 
                        width: 350, 
                        borderRadius: 30,
                        backgroundColor: 'white', 
                        color: 'black',
                        boxShadow: 0
                    }}
                    startIcon={<AppleIcon sx={{ color: '#000000' }}/>} 
                >
                    Sign in with Apple
                </Button>
            </Box>
        </div>
    );
}

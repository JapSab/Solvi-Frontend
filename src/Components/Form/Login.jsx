import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
                height:'30px',
                 outline: 'none',
                boxShadow: 'none'
            }}
        />
        {error && <span style={{ color: 'red', fontSize: '12px' }}>{helperText}</span>}
    </div>
);

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

            <h2 style={{ marginTop: 150, textAlign: 'center', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal' }}>Log in</h2>

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
                        backgroundColor: '#841E60',
                        '&:hover': { backgroundColor: '#EB7745' } 
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
        </div>
    );
}

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextsmsIcon from '@mui/icons-material/Textsms';
import useMediaQuery from '@mui/material/useMediaQuery';
import './Form.css';
import LoginForms from './Login';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function LoginForm() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md')); // Change 'md' to the desired breakpoint

  return (
    <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns={isSmallScreen ? "repeat(12, 1fr)" : "repeat(12, 1fr)"}>
        {!isSmallScreen && (
          <Box gridColumn="span 3" style={{ marginTop: 200 }}>
            <Box
              sx={{
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                '& > :not(style)': {
                  width: '100%',
                },
              }}
            >
              <TextsmsIcon sx={{ fontSize: 48, color: '#841E60' }} />
              <p style={{ fontSize: 21, textAlign: 'center', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal' }}>
                What tasks can you accomplish with the assistance of Solvi?
              </p>
              <ul className="green-tick" style={{ textAlign: 'center', fontSize: 16, fontFamily: '"Poppins", sans-serif' }}>
                <li>You'll receive a response to any inquiry</li>
                <li>All of your questions will be addressed by our team of expert lawyers</li>
                <li>All of your questions will be addressed by our team of expert lawyers</li>
              </ul>
            </Box>
          </Box>
        )}
        <Box gridColumn={isSmallScreen ? "span 12" : "span 9"} sx={{ backgroundColor: '#F6F5F8', height: '90vh' }}>
          {/* <Item>xs=8</Item> */}
          <LoginForms />
        </Box>
      </Box>
    </Box>
  );
}

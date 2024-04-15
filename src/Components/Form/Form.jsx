import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextsmsIcon from '@mui/icons-material/Textsms';
import './Form.css'
import RegistrationForms from './Register';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Form() {
  return (
    <Box sx={{ width: 1 }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)">
        <Box gridColumn="span 3" style={{marginTop: 200}}>
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
            <TextsmsIcon sx={{ fontSize: 48, color: '#461646' }} />
            <p style={{ fontSize: 21, textAlign: 'center', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal' }}>What tasks can you accomplish with the assistance of Solvi?</p>
            <ul className="green-tick" style={{ textAlign: 'center', fontSize: 16, fontFamily: '"Poppins", sans-serif' }}>
              <li>You'll receive a response to any inquiry</li>
              <li>All of your questions will be addressed by our team of expert lawyers</li>
              <li>All of your questions will be addressed by our team of expert lawyers</li>
            </ul>
          </Box>
        </Box>
        <Box gridColumn="span 9" sx={{backgroundColor: '#F6F5F8', height:'100vh'}}>
          {/* <Item>xs=8</Item> */}
          <RegistrationForms/>
        </Box>
      </Box>
    </Box>
  );
}

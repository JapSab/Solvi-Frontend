import * as React from 'react';
import Box from '@mui/material/Box';
import ChatInput from './Chat';
import { Chat } from '@mui/icons-material';


export default function ChatterPage() {
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
            <p style={{ fontSize: 30, textAlign: 'center', fontFamily: '"Poppins", sans-serif', fontWeight: 'normal' }}>Here will be a place for chat history</p>
            
          </Box>
        </Box>
        <Box gridColumn="span 9" sx={{backgroundColor: '#F6F5F8', height:'95vh'}}>
            <ChatInput/>
          {/* <Item>xs=8</Item> */}
        </Box>
      </Box>
    </Box>
  );
}

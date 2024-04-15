import React from 'react';
import { Container, Grid, Typography, Box, Paper, Input, Button } from '@mui/material';
import Background from '../../images/solvibackground.jpg'
import './Container.css'

const Homepage = () => {
  return (
    <Container className='container' maxWidth="lg" style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '800px',display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', borderRadius: '10px', marginTop: '30px' }}>
        <div className='background-overlay'/>

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <Box p={2} style={{ marginBottom: '400px'}}>
            <Typography variant="h4" component="h1" gutterBottom 
                sx={{
                    mr: 3,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: '"Bebas Neue", sans-serif', 
                    fontSize: 30,
                    fontStyle: 'normal',
                    // fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'white',
                    textDecoration: 'none',
            }}>
            Reach professional attorneys who can answer any legal question!
            </Typography>
            <Typography variant="body1" gutterBottom>
                <ul style={{color: 'white'}}>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, aliquid.</li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, aliquid.</li>
                </ul>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Paper style={{ width: '400px', minHeight: '500px',padding: '20px' }}>
              <Box bgcolor="#461646" color="white" p={3} mb={3} textAlign="center" fontSize={25} style={{fontFamily: '"Bebas Neue", sans-serif',}}>
              Get answers until you’re satisfied

              </Box>
              {/* <TextareaAutosize rowsMin={3} style={{ width: '100%', marginBottom: '20px' }} placeholder="Type your message here..." /> */}
              <Input fullWidth placeholder="Type your message here..." style={{ marginBottom: '20px' }} />

               
              <Button variant="contained" justifyContent style={{marginTop: '400px', backgroundColor: '#461646'}}>
                Start Conversation
              </Button>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Homepage;

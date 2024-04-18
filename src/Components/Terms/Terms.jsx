import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Terms() {
  const containerStyle = {
    textAlign: 'center', // Center the content horizontally
    color: '#666', // Grey color for text
    maxWidth: '800px', // Limiting width for better readability
    margin: '0 auto', // Centering the container horizontally
    padding: '0 20px', // Adding some horizontal padding
  };

  return (
    <div>
         <Fab aria-label="add"
          style={{ marginTop: 10, marginLeft: 20, boxShadow: 'none', backgroundColor: '#f6f5f800', color: '#461646' }}
          onClick={() => window.history.back()}
      >
        <ArrowBackIcon/>
      </Fab>
    <div style={containerStyle}>
     

      <h2 style={{marginTop:'10%'}}>წესები და პირობები</h2>  
      <br></br>  
      <p style={{marginTop:'5%', fontSize:20}}>
        პრეამბულა: წინამდებარე ვებ-გვერდის www.eacademy.ge (შემდგომში ვებ-გვერდი) გამოყენება რეგულირდება შპს ელექტრონული აკადემიის (შემდეგში კომპანია), მიერ დადგენილი წინამდებარე წესებითა და პირობებით. (შემდგომში წესები და პირობები).
        გთხოვთ, დეტალურად გაეცნოთ წინამდებარე წესებსა და პირობებს, რომელიც არეგულირებს მომხმარებლის მიერ ვებ-გვერდის გამოყენებას.
        წინამდებარე დოკუმენტის მიზნებისათვის მომხმარებელი არის ნებისმიერი ფიზიკური ან/და იურიდიული პირი, ორგანიზაციული წარმონაქმნი, რომელიც იყენებს ან/და მომავალში გამოიყენებს ვებ-გვერდს, ან/და სარგებლობს კომპანიის სერვისებით.
        წინამდებარე ვებ-გვერდზე შესვლით თქვენ ეთანხმებით და ადასტურებთ ვებ-გვერდის გამოყენების წინამდებარე წესებსა და პირობებს. ასევე, ადასტურებთ რომ იცნობთ და ეთანხმებით იმ ცვლილებებსა და დამატებებს, რომლებიც შესაძლოა პერიოდულად შევიდეს აღნიშნულ წესებსა და
      </p>
      <Box display="flex" justifyContent="center" marginTop={10}>
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
    </div>
  );
}

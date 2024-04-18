// VerificationCodeInput.js
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function MobileVerification({ onCodeComplete }) {
  const [code, setCode] = React.useState(["", "", "", ""]);

  const handleChange = (index, event) => {
    const newCode = [...code];
    newCode[index] = event.target.value.slice(0, 1);  // Limit to 1 character
    setCode(newCode);

    if (event.target.value && index < 3) {
      document.getElementById(`code-${index + 1}`).focus();
    }

    if (newCode.every(c => c.length === 1)) {
      onCodeComplete(newCode.join(''));
    }
  };

  return (
    
    <div>
     
        <Box display="flex" justifyContent="center" gap={2}>
          {code.map((c, index) => (
            <TextField
              key={index}
              id={`code-${index}`}
              type="text"
              inputProps={{ maxLength: 1, pattern: "[0-9]*" }}
              onChange={(e) => handleChange(index, e)}
              value={c}
              sx={{ width: "50px" }}
            />
          ))}
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
          // onClick={handleContinue}
        >
            Continue {'>'}</Button>
      </Box>
    </div>
  );
}

export default MobileVerification;

// LogoutModal.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const LogoutModal = ({ open, handleClose, handleLogout }) => {
  const handleConfirmLogout = () => {
    localStorage.removeItem('auth-token');
    handleLogout();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2">
          Confirm Logout
        </Typography>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          Are you sure you want to logout?  All unfinished chats, transactions etc may be terminated and cancelled.
        </Typography>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleConfirmLogout}>
            Yes
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LogoutModal;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useAuth } from '../../utils/AuthContext';
import LogoutModal from './LogoutModal';

const pages = ['Services'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handlePageClick = (page) => {
    if (page === 'Services') {
      navigate('/services');
    }
    handleCloseNavMenu();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white', color: '#605DEC', borderBottom: '1px solid silver' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 3,
                display: { xs: 'none', md: 'flex' },
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 30,
                fontStyle: 'italic',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/')}
            >
              SOLVI
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handlePageClick(page)}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  sx={{ my: 2, color: 'black', display: 'block', fontSize: 15, minWidth: 120 }} // Adjusted size here
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
              <Tooltip>
                <Button
                  variant="contained"
                  sx={{
                    color: 'black',
                    backgroundColor: '#dbdbdb',
                    border: '1px #461646',
                    borderRadius: 2,
                    height: 40,
                    width: 100,
                    '&:hover': {
                      color: '#605DEC',
                      backgroundColor: 'White',
                    }
                  }}
                >
                  Help <InfoOutlinedIcon sx={{ marginLeft: 1 }} />
                </Button>
              </Tooltip>
              {isAuthenticated && (
                <Tooltip>
                  <Button
                    variant="contained"
                    sx={{
                      color: 'black',
                      backgroundColor: '#dbdbdb',
                      border: '1px #461646',
                      borderRadius: 2,
                      height: 40,
                      width: 100,
                      ml: 2, // Add margin to the left for spacing
                      '&:hover': {
                        color: 'red',
                        backgroundColor: 'White',
                      }
                    }}
                    onClick={handleOpenModal}
                  >
                    Logout
                  </Button>
                </Tooltip>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <LogoutModal open={isModalOpen} handleClose={handleCloseModal} handleLogout={handleLogout} />
    </>
  );
}

export default Navbar;

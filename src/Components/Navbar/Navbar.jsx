import React, { useState, useContext, useEffect } from 'react';
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
import LanguageContext from '../../utils/LanguageContext';
import './Navbar.css'; // Import the CSS file for animations

const translations = {
  ENG: {
    pages: ['About Us', 'Services', 'Contact Us', 'How To Use', 'News'],
    help: 'Help',
    login: 'Login',
    signUp: 'Sign Up',
  },
  GEO: {
    pages: ['ჩვენ შესახებ', 'სერვისები', 'დაგვიკავშირდით', 'როგორ გამოვიყენოთ', 'ახალი ამბები'],
    help: 'დახმარება',
    login: 'შესვლა',
    signUp: 'რეგისტრაცია',
  },
};

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [transitionState, setTransitionState] = useState('fade-in');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (transitionState === 'fade-out') {
      const timer = setTimeout(() => {
        setVisible(false);
        setTransitionState('fade-in');
      }, 500); // Match this duration with the CSS animation duration
      return () => clearTimeout(timer);
    } else if (transitionState === 'fade-in') {
      setVisible(true);
    }
  }, [transitionState]);

  const handleToggleLanguage = () => {
    setTransitionState('fade-out');
    setTimeout(() => {
      toggleLanguage();
      setTransitionState('fade-in');
    }, 500); // Match this duration with the CSS animation duration
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePageClick = (page) => {
    if (page === 'Services' || page === 'სერვისები') {
      navigate('/services');
    } else if (page === 'About Us' || page === 'ჩვენ შესახებ') {
      navigate('/about-us');
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

  const navItemStyle = {
    my: 2,
    color: 'black',
    display: 'block',
    fontSize: 15,
    padding: '0 15px', // Adjust padding for better spacing
  };

  return (
    <>
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white', color: '#841E60', borderBottom: '1px solid silver' }}>
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
                cursor: 'pointer',
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
                {translations[language].pages.map((page) => (
                  <MenuItem key={page} onClick={() => handlePageClick(page)} className={transitionState}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleToggleLanguage} className={transitionState}>
                  <Typography textAlign="center">{language}</Typography>
                </MenuItem>
                {!isAuthenticated && (
                  <>
                    <MenuItem onClick={() => navigate('/login')} className={transitionState}>
                      <Typography textAlign="center">{translations[language].login}</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/registration')} className={transitionState}>
                      <Typography textAlign="center">{translations[language].signUp}</Typography>
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 2 }} className={transitionState}>
              {visible && translations[language].pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageClick(page)}
                  sx={navItemStyle}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }} className={transitionState}>
              {visible && (
                <Tooltip>
                  <Button
                    variant="contained"
                    sx={{
                      color: 'black',
                      backgroundColor: '#dbdbdb',
                      border: '1px #461646',
                      borderRadius: 2,
                      height: 40,
                      width: 120,
                      '&:hover': {
                        color: '#841E60',
                        backgroundColor: 'White',
                      },
                    }}
                  >
                    {translations[language].help} <InfoOutlinedIcon sx={{ marginLeft: 1 }} />
                  </Button>
                </Tooltip>
              )}
              {isAuthenticated ? (
                visible && (
                  <Tooltip>
                    <Button
                      variant="contained"
                      sx={{
                        color: 'black',
                        backgroundColor: '#dbdbdb',
                        border: '1px #461646',
                        borderRadius: 2,
                        height: 40,
                        width: 120,
                        '&:hover': {
                          color: 'red',
                          backgroundColor: 'White',
                        },
                      }}
                      onClick={handleOpenModal}
                    >
                      Logout
                    </Button>
                  </Tooltip>
                )
              ) : (
                visible && (
                  <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                    <Tooltip>
                      <Button
                        variant="contained"
                        sx={{
                          color: 'black',
                          backgroundColor: '#dbdbdb',
                          border: '1px #461646',
                          borderRadius: 2,
                          height: 40,
                          width: 120,
                          '&:hover': {
                            color: '#841E60',
                            backgroundColor: 'White',
                          },
                        }}
                        onClick={() => navigate('/login')}
                      >
                        {translations[language].login}
                      </Button>
                    </Tooltip>
                    <Tooltip>
                      <Button
                        variant="contained"
                        sx={{
                          color: 'black',
                          backgroundColor: '#dbdbdb',
                          border: '1px #461646',
                          borderRadius: 2,
                          height: 40,
                          width: 120,
                          '&:hover': {
                            color: '#841E60',
                            backgroundColor: 'White',
                          },
                        }}
                        onClick={() => navigate('/registration')}
                      >
                        {translations[language].signUp}
                      </Button>
                    </Tooltip>
                  </Box>
                )
              )}
              {visible && (
                <Button onClick={handleToggleLanguage} sx={navItemStyle}>
                  {language}
                </Button>
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

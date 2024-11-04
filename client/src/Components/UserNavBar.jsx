import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, ButtonBase, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assests/imagenes/logo.png';

const UserNavBar = ({ handleMenuClick, handleMasterDrawer }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [onclickFunction, setOnclickFunction] = useState(null);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (location.pathname.startsWith('/usuario')) {
      setOnclickFunction(() => handleMenuClick);
    } else if (location.pathname.startsWith('/master')) {
      setOnclickFunction(() => handleMasterDrawer);
    }
  }, [location.pathname, handleMenuClick, handleMasterDrawer]);

  const shouldRenderBackButton = !['/usuario', '/master'].includes(location.pathname);

  return (
    <CustomAppBar elevation={0}>
      <Toolbar>
        <ToolBarContent>
          {/* En vista móvil se muestra el botón de retroceso */}
          {shouldRenderBackButton && (
            <ButtonBase onClick={handleBack} sx={{ display: { md: 'none' } }}>
              <ArrowBackIcon fontSize="large" sx={{ color: 'black' }} />
            </ButtonBase>
          )}

          {/* Logo alineado a la izquierda en desktop y centrado en móvil */}
          <LogoWrapper>
            <Logo src={logo} alt="Gympall Logo" />
          </LogoWrapper>

          {/* Menú a la derecha (solo visible en móvil) */}
          <Box sx={{  display: { md: 'none' }}}>
            <ButtonBase onClick={onclickFunction}>
              <MenuIcon fontSize="large" sx={{ color: 'black' }} />
            </ButtonBase>
          </Box>
        </ToolBarContent>
      </Toolbar>
    </CustomAppBar>
  );
};

export default UserNavBar;

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  width: '100vw',
  height: 'auto',
  backgroundColor: 'white',
  position: 'fixed', // Siempre fijo en la parte superior
  top: 0, // Asegura que esté en la parte superior
  zIndex: 1201, // Por encima del drawer
}));

const ToolBarContent = styled(Box)(({ theme }) => ({
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent:'space-between',
  padding: '0',
  margin: '0',
}));

const LogoWrapper = styled(Box)(({ theme }) => ({
  // flex: 1,
  // display: 'flex',
  // justifyContent: {
  //   xs: 'center', // Centrado en móvil
  //   md: 'flex-start' // Alineado a la izquierda en desktop
  // },
  paddingLeft: theme.spacing(2), // Padding a la izquierda para el logo
}));

const Logo = styled('img')(({ theme }) => ({
  height: '40px',
}));


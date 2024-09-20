import React from 'react';
import { Box, Drawer, ListItem, ListItemIcon, ListItemText, Typography, styled } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LogoutIcon from '@mui/icons-material/Logout'; // Icono para salir
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Para manejar cookies

const drawerWidth = '240px';

const UserDrawer = ({ open, onClose, handleLogout }) => {
  const navigate = useNavigate();

  const handleListItemClick = () => {
    navigate('/usuario-rutina');
    onClose();
  };

  const handleLogoutClick = () => {
    const token = Cookies.get("token")
    console.log(token);
    
    Cookies.remove("token"); // Reemplaza 'userToken' por el nombre de tu cookie
    console.log(token);
    
    
    // Cerrar el drawer
    onClose();

    // Redirigir a la landing page
    navigate('/');
  };

  return (
    <CustomDrawer
      open={open}
      anchor="right"
      onClose={onClose}
    >
      <Typography variant="h5" textAlign="center" sx={{ marginTop: '30px' }}>Panel de control</Typography>
      
      <ListItem onClick={handleListItemClick} sx={{ marginTop: '50px' }}>
        <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <FitnessCenterIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6">Mi rutina</Typography>
        </ListItemText>
      </ListItem>

      {/* ListItem para cerrar sesión */}
      <ListItem onClick={handleLogoutClick} sx={{ marginTop: '50px' }}>
        <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <LogoutIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6">Salir</Typography>
        </ListItemText>
      </ListItem>
    </CustomDrawer>
  );
};

export default UserDrawer;

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
  }
}));

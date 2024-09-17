import React from 'react';
import { Box, Drawer, ListItem, ListItemIcon, ListItemText, Typography, styled } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useNavigate } from 'react-router-dom';

const drawerWidth = '240px';

const UserDrawer = ({ open, onClose }) => {
  const navigate = useNavigate();

  const handleListItemClick = () => {
    navigate('/usuario-rutina');
    onClose();
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
    </CustomDrawer>
  );
};

export default UserDrawer;

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
  }
}));

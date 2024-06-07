import React, { useEffect, useState } from "react";
import { Box, Drawer, ListItem, ListItemIcon, ListItemText, Typography, styled } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useNavigate } from 'react-router-dom';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const drawerWidth = '240px';

const MasterDrawer = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [navPath, setNavPath] = useState(null);

  const handleListItemClick = (path) => {
    setNavPath(path);
    onClose();
  };

  useEffect(() => {
    if (navPath) {
      navigate(navPath);
      setNavPath(null); // Reset navPath after navigation
    }
  }, [navPath, navigate]);

  return (
    <CustomDrawer open={open} anchor="right" onClose={onClose}>
      <Typography variant="h5" textAlign="center" sx={{ marginTop: '30px' }}>
        Panel de control
      </Typography>
      <ListItem onClick={() => handleListItemClick('/registro-usuario')} sx={{ marginTop: '50px' }}>
        <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AddIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6">Registro usuario</Typography>
        </ListItemText>
      </ListItem>
      <ListItem onClick={() => handleListItemClick('/editar-usuario')} sx={{ marginTop: '20px' }}>
        <ListItemIcon sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <EditIcon fontSize="large" />
        </ListItemIcon>
        <ListItemText sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h6">Editar usuarios</Typography>
        </ListItemText>
      </ListItem>
      {/* Añade más opciones aquí con su respectivo onClick */}
    </CustomDrawer>
  );
};

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
  }
}));

export default MasterDrawer;

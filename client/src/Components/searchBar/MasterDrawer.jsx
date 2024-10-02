import React, { useEffect, useState } from "react";
import { Box, Drawer, ListItem, ListItemIcon, ListItemText, Typography, Accordion, AccordionSummary, AccordionDetails, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GroupIcon from '@mui/icons-material/Group';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout'; // Icono para salir
import Cookies from 'js-cookie'; // Librería para manejar cookies


const drawerWidth = '240px';

const MasterDrawer = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [navPath, setNavPath] = useState(null);
  
  const handleListItemClick = (path) => {
    setNavPath(path);
    onClose();
  };

  const handleLogout = () => {
    Cookies.remove('token'); // Eliminar cookie
    onClose();
    navigate('/'); // Redirigir al login
  };

  useEffect(() => {
    if (navPath) {
      navigate(navPath);
      setNavPath(null);
    }
  }, [navPath, navigate]);

  return (
    <CustomDrawer open={open} anchor="right" onClose={onClose}>
      <Typography variant="h5" textAlign="center" sx={{ marginTop: '30px' }}>
        Panel de control
      </Typography>

      {/* Acordeón de Usuarios */}
      <StyledAccordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
          <ListItemIcon>
            <GroupIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <Typography variant="h6" sx={{ color: '#fff' }}>Usuarios</Typography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <StyledListItem onClick={() => handleListItemClick('/master/registro-usuario')}>
            <ListItemIcon><AddIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText><Typography variant="h6" sx={{ color: '#fff' }}>Registro usuario</Typography></ListItemText>
          </StyledListItem>
          <StyledListItem onClick={() => handleListItemClick('/master/editar-usuario')}>
            <ListItemIcon><EditIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText><Typography variant="h6" sx={{ color: '#fff' }}>Editar usuarios</Typography></ListItemText>
          </StyledListItem>
        </StyledAccordionDetails>
      </StyledAccordion>

      {/* Acordeón de Rutinas */}
      <StyledAccordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
          <ListItemIcon>
            <AssignmentIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <Typography variant="h6" sx={{ color: '#fff' }}>Rutinas</Typography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <StyledListItem onClick={() => handleListItemClick('/master/crear-rutina')}>
            <ListItemIcon><FitnessCenterIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText><Typography variant="h6" sx={{ color: '#fff' }}>Crear rutina</Typography></ListItemText>
          </StyledListItem>
          <StyledListItem onClick={() => handleListItemClick('/master/editar-rutina')}>
            <ListItemIcon><EditIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText><Typography variant="h6" sx={{ color: '#fff' }}>Editar rutina</Typography></ListItemText>
          </StyledListItem>
          <StyledListItem onClick={() => handleListItemClick('/master/crear-ejercicio')}>
            <ListItemIcon><FitnessCenterIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText><Typography variant="h6" sx={{ color: '#fff' }}>Crear ejercicio</Typography></ListItemText>
          </StyledListItem>
        </StyledAccordionDetails>
      </StyledAccordion>

      {/* Acordeón de Pagos */}
      <StyledAccordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
          <ListItemIcon>
            <AttachMoneyIcon style={{ color: 'white' }} />
          </ListItemIcon>
          <Typography variant="h6" sx={{ color: '#fff' }}>Pagos</Typography>
        </AccordionSummary>
        <StyledAccordionDetails>
          <StyledListItem onClick={() => handleListItemClick('/master/payments')}>
            <ListItemIcon><AddIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText><Typography variant="h6" sx={{ color: '#fff' }}>Nuevo pago</Typography></ListItemText>
          </StyledListItem>
          <StyledListItem onClick={() => handleListItemClick('/master/all-payments')}>
            <ListItemIcon><AttachMoneyIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
            <ListItemText><Typography variant="h6" sx={{ color: '#fff' }}>Listar pagos</Typography></ListItemText>
          </StyledListItem>
        </StyledAccordionDetails>
      </StyledAccordion>

      {/* Otras Opciones */}
      <StyledListItem onClick={() => handleListItemClick('/master/posts')} sx={{ marginTop: '20px' }}>
        <ListItemIcon><PostAddIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
        <ListItemText><Typography variant="h6" sx={{ color: '#fff' }}>Posts</Typography></ListItemText>
      </StyledListItem>
      <StyledListItem onClick={() => handleListItemClick('/master/settings')} sx={{ marginTop: '20px' }}>
        <ListItemIcon><SettingsIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
        <ListItemText><Typography variant="h6" sx={{ color: '#fff' }}>Ajustes</Typography></ListItemText>
      </StyledListItem>

      {/* ListItem para Salir */}
      <StyledListItem onClick={handleLogout} sx={{ marginTop: '20px' }}>
        <ListItemIcon><LogoutIcon fontSize="large" style={{ color: 'white' }} /></ListItemIcon>
        <ListItemText><Typography variant="h6" sx={{ color: '#fff' }}>Salir</Typography></ListItemText>
      </StyledListItem>
    </CustomDrawer>
  );
};

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    backdropFilter: 'blur(7px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    borderRight: '1px solid rgba(255, 255, 255, 0.2)',
  },
  '.MuiListItemIcon-root': {
    color: '#fff',
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#fff',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  '& .MuiAccordionSummary-root': {
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}));

export default MasterDrawer;

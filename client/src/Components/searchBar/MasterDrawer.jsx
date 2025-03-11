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
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import useMediaQuery from '@mui/material/useMediaQuery';
import { display } from "@mui/system";
import { useLocation } from 'react-router-dom'; // Importa el hook
import { useLogginStore } from "../../store/useLogginStore"; 

const drawerWidth = '240px';

const MasterDrawer = ({ open, onClose ,setVerifiedUser}) => {
  const navigate = useNavigate();
  const [navPath, setNavPath] = useState(null);
  const location = useLocation(); // Hook para obtener la ruta actual
  const {logout,setLoggin} = useLogginStore();

  const isDesktop = useMediaQuery('(min-width:1024px)');
  const isMasterOrUserRoute = location.pathname.includes('/master') || location.pathname.includes('/user');
const isDesktopDrawer = isDesktop && isMasterOrUserRoute;

  const handleListItemClick = (path) => {
    setNavPath(path);
    if (!isDesktop) onClose();
  };

  const handleLogout = () => {
    Cookies.remove('token');
    logout();
    setLoggin(false);
    onClose();
    setVerifiedUser("")
    navigate('/');
  };

  useEffect(() => {
    if (navPath) {
      navigate(navPath);
      setNavPath(null);
    }
  }, [navPath, navigate]);

  if (location.pathname === '/') {
    return null;
  }

  return (
    <CustomDrawer
      variant={isDesktopDrawer ? 'persistent' : 'temporary'}
      open={isDesktopDrawer || open}
      anchor="left"
      onClose={onClose}
      isDesktop={isDesktop}
    >
      <DrawerContent isDesktop={isDesktop}>
        <Typography variant="h5" textAlign="center" sx={{ marginTop: '30px', fontFamily: 'Nunito', fontWeight: '300', fontSize: '26px',marginBottom:'30px' }}>
          Panel de control
        </Typography>

        {/* Acordeón de Usuarios */}
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'black' }} />}>
            <ListItemIcon>
              <GroupIcon style={{ color: 'black' }} />
            </ListItemIcon>
            <Typography variant="h6" sx={{ color: 'black' }}>Usuarios</Typography>
          </AccordionSummary>
          <StyledAccordionDetails>
            <StyledListItem onClick={() => handleListItemClick('/master/registro-usuario')}>
              <ListItemIcon><AddIcon fontSize="large" style={{ color: 'black' }} /></ListItemIcon>
              <ListItemText><Typography variant="h6" sx={{ color: 'black' }}>Registro usuario</Typography></ListItemText>
            </StyledListItem>
            <StyledListItem onClick={() => handleListItemClick('/master/editar-usuario')}>
              <ListItemIcon><EditIcon fontSize="large" style={{ color: 'black' }} /></ListItemIcon>
              <ListItemText><Typography variant="h6" sx={{ color: 'black' }}>Editar usuarios</Typography></ListItemText>
            </StyledListItem>
          </StyledAccordionDetails>
        </StyledAccordion>

        {/* Acordeón de Rutinas */}
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'black' }} />}>
            <ListItemIcon>
              <AssignmentIcon style={{ color: 'black' }} />
            </ListItemIcon>
            <Typography variant="h6" sx={{ color: 'black' }}>Rutinas</Typography>
          </AccordionSummary>
          <StyledAccordionDetails>
            <StyledListItem onClick={() => handleListItemClick('/master/crear-rutina')}>
              <ListItemIcon><FitnessCenterIcon fontSize="large" style={{ color: 'black' }} /></ListItemIcon>
              <ListItemText><Typography variant="h6" sx={{ color: 'black' }}>Crear rutina</Typography></ListItemText>
            </StyledListItem>
            <StyledListItem onClick={() => handleListItemClick('/master/editar-rutina')}>
              <ListItemIcon><EditIcon fontSize="large" style={{ color: 'black' }} /></ListItemIcon>
              <ListItemText><Typography variant="h6" sx={{ color: 'black' }}>Editar rutina</Typography></ListItemText>
            </StyledListItem>
            <StyledListItem onClick={() => handleListItemClick('/master/crear-ejercicio')}>
              <ListItemIcon><FitnessCenterIcon fontSize="large" style={{ color: 'black' }} /></ListItemIcon>
              <ListItemText><Typography variant="h6" sx={{ color: 'black' }}>Crear ejercicio</Typography></ListItemText>
            </StyledListItem>
          </StyledAccordionDetails>
        </StyledAccordion>

        {/* Acordeón de Actividades */} 
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'black' }} />}>
            <ListItemIcon>
              <GroupIcon style={{ color: 'black' }} />
            </ListItemIcon>
            <Typography variant="h6" sx={{ color: 'black' }}>Actividades</Typography>
          </AccordionSummary>
          <StyledAccordionDetails>
            <StyledListItem onClick={() => handleListItemClick('/master/crear-actividad')}>
              <ListItemIcon><AddIcon fontSize="large" style={{ color: 'black' }} /></ListItemIcon>
              <ListItemText><Typography variant="h6" sx={{ color: 'black' }}>Crear actividad</Typography></ListItemText>
            </StyledListItem>
            <StyledListItem onClick={() => handleListItemClick('/master/editar-actividad')}>
              <ListItemIcon><EditIcon fontSize="large" style={{ color: 'black' }} /></ListItemIcon>
              <ListItemText><Typography variant="h6" sx={{ color: 'black' }}>Editar actividad</Typography></ListItemText>
            </StyledListItem>
          </StyledAccordionDetails>
        </StyledAccordion>

        {/* Acordeón de Pagos */}
        <StyledAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'black' }} />}>
            <ListItemIcon>
              <AttachMoneyIcon style={{ color: 'black' }} />
            </ListItemIcon>
            <Typography variant="h6" sx={{ color: 'black' }}>Pagos</Typography>
          </AccordionSummary>
          <StyledAccordionDetails>
            <StyledListItem onClick={() => handleListItemClick('/master/payments')}>
              <ListItemIcon><AddIcon fontSize="large" style={{ color: 'black' }} /></ListItemIcon>
              <ListItemText><Typography variant="h6" sx={{ color: 'black' }}>Nuevo pago</Typography></ListItemText>
            </StyledListItem>
            <StyledListItem onClick={() => handleListItemClick('/master/all-payments')}>
              <ListItemIcon><AttachMoneyIcon fontSize="large" style={{ color: 'black' }} /></ListItemIcon>
              <ListItemText><Typography variant="h6" sx={{ color: 'black' }}>Listar pagos</Typography></ListItemText>
            </StyledListItem>
          </StyledAccordionDetails>
        </StyledAccordion>

        {/* Otras Opciones */}
        <StyledListItem onClick={() => handleListItemClick('/master/posts')} sx={{ marginTop: '20px' }}>
          <ListItemIcon><PostAddIcon fontSize="large" style={{ color: 'black' }} /></ListItemIcon>
          <ListItemText><Typography variant="h6" sx={{ color: 'black' }}>Posts</Typography></ListItemText>
        </StyledListItem>
        <StyledListItem onClick={() => handleListItemClick('/master/settings')} sx={{ marginTop: '20px' }}>
          <ListItemIcon><SettingsIcon fontSize="large" style={{ color: 'black' }} /></ListItemIcon>
          <ListItemText><Typography variant="h6" sx={{ color: 'black' }}>Ajustes</Typography></ListItemText>
        </StyledListItem>

        <StyledListItem onClick={() => handleListItemClick('/master/subscriptions')} sx={{ marginTop: '20px' }}>
              <ListItemIcon><EditIcon fontSize="large" style={{ color: 'black' }} /></ListItemIcon>
              <ListItemText><Typography variant="h6" sx={{ color: 'black' }}>Subscripciones</Typography></ListItemText>
            </StyledListItem>

        {/* ListItem para Salir */}
        <StyledListItem onClick={handleLogout} sx={{ marginTop: '20px' }}>
          <ListItemIcon><LogoutIcon fontSize="large" style={{ color: 'black' }} /></ListItemIcon>
          <ListItemText><Typography variant="h6" sx={{ color: 'black' }}>Salir</Typography></ListItemText>
        </StyledListItem>
      </DrawerContent>
    </CustomDrawer>
  );
};

// Estilos personalizados
const CustomDrawer = styled(Drawer)(({ theme, isDesktop }) => ({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    backgroundColor: '#fff',  // Fondo blanco
    color: '#000',  // Texto negro
    borderRight: '1px solid rgba(0, 0, 0, 0.1)',
    fontFamily: 'Nunito',
    fontSize: '26px',
    zIndex: isDesktop ? 1201 : 'auto',
    display:'flex',
  },
}));

// Centrar contenido en vista desktop
const DrawerContent = styled(Box)(({ isDesktop }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: isDesktop ? 'center' : 'flex-start',  // Centramos verticalmente solo en desktop
  padding: isDesktop ? '0 20px' : '20px',  // Espaciado condicional
  marginTop:'50px'
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: '#000',  // Texto negro
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
  },
}));

export default MasterDrawer;

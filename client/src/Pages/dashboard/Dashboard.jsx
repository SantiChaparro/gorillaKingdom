
import NewUserForm from "../users/newUserForm/NewUserForm";
import Payments from "../payments/Payments";
import { Box, Drawer, Typography, ListItem, Button, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { styled } from '@mui/system';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import React, { useState } from "react";

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
  },
}));

const Dashboard = () => {
  const [usuariosAnchorEl, setUsuariosAnchorEl] = useState(null);
  const [rutinasAnchorEl, setRutinasAnchorEl] = useState(null);
  const [ejerciciosAnchorEl, setEjerciciosAnchorEl] = useState(null);
  const [pagosAnchorEl, setPagosAnchorEl] = useState(null);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);

  console.log('la opcion seleccionada es:',opcionSeleccionada)

  const handleOpenMenu = (event, setAnchorEl) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = (setAnchorEl) => {
    setAnchorEl(null);
  };

  const showContent = (opcion) => {
    switch (opcion) {
      case 'Registrar Usuario':
        return <NewUserForm />;
      case 'Registrar Pago':
        return <Payments />;
      // Agrega más casos para otras opciones si es necesario
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', height:'100vh',padding:'none' }}>
      <StyledDrawer
        variant="permanent"
        anchor="left"
      >
        <div>
          <Typography variant="h5" align="center">Panel de control</Typography>
        </div>
        <ListItem>
          <Button
            fullWidth
            color="inherit"
            onClick={(event) => handleOpenMenu(event, setUsuariosAnchorEl)}
          >
            <ListItemIcon>
              <PersonSharpIcon />
            </ListItemIcon>
            <ListItemText primary={'Usuarios'} sx={{ textAlign: 'left' }}/>
          </Button>
          <Menu
            id="usuarios-menu"
            anchorEl={usuariosAnchorEl}
            open={Boolean(usuariosAnchorEl)}
            onClose={() => handleCloseMenu(setUsuariosAnchorEl)}
          >
           <MenuItem onClick={() => {
              handleCloseMenu(setUsuariosAnchorEl);
             { setOpcionSeleccionada('Registrar Usuario');}
            }}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Registrar Usuario"/>
            </MenuItem>
            <MenuItem onClick={() => handleCloseMenu(setUsuariosAnchorEl)}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Editar Usuario" />
            </MenuItem>
          </Menu>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            color="inherit"
            onClick={(event) => handleOpenMenu(event, setRutinasAnchorEl)}
          >
            <ListItemIcon>
              <PersonSharpIcon />
            </ListItemIcon>
            <ListItemText primary={'Rutinas'} sx={{ textAlign: 'left' }} />
          </Button>
          <Menu
            id="rutinas-menu"
            anchorEl={rutinasAnchorEl}
            open={Boolean(rutinasAnchorEl)}
            onClose={() => handleCloseMenu(setRutinasAnchorEl)}
          >
            <MenuItem onClick={() => handleCloseMenu(setRutinasAnchorEl)}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Crear rutina" />
            </MenuItem>
            <MenuItem onClick={() => handleCloseMenu(setRutinasAnchorEl)}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Modificar rutina" />
            </MenuItem>
          </Menu>
        </ListItem>
        <ListItem>
          <Button
            fullWidth
            color="inherit"
            onClick={(event) => handleOpenMenu(event, setEjerciciosAnchorEl)}
          >
            <ListItemIcon>
              <PersonSharpIcon />
            </ListItemIcon>
            <ListItemText primary={'Ejercicios'} sx={{ textAlign: 'left' }} />
          </Button>
          <Menu
            id="ejercicios-menu"
            anchorEl={ejerciciosAnchorEl}
            open={Boolean(ejerciciosAnchorEl)}
            onClose={() => handleCloseMenu(setEjerciciosAnchorEl)}
          >
            <MenuItem onClick={() => handleCloseMenu(setEjerciciosAnchorEl)}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Crear ejercicio" />
            </MenuItem>
           
          </Menu>
        </ListItem>

        <ListItem>
          <Button
            fullWidth
            color="inherit"
            onClick={(event) => handleOpenMenu(event, setPagosAnchorEl)}
          >
            <ListItemIcon>
              <PersonSharpIcon />
            </ListItemIcon>
            <ListItemText primary={'Pagos'} sx={{ textAlign: 'left' }} />
          </Button>
          <Menu
            id="pagos-menu"
            anchorEl={pagosAnchorEl}
            open={Boolean(pagosAnchorEl)}
            onClose={() => handleCloseMenu(setPagosAnchorEl)}
          >
            <MenuItem onClick={() => {
                handleCloseMenu(setPagosAnchorEl)
                setOpcionSeleccionada("Registrar Pago")
                }}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Registrar Pago" />
            </MenuItem>
           
          </Menu>
        </ListItem>
        {/* Repite el mismo patrón para los otros elementos del menú */}
      </StyledDrawer>
      <Box sx={{ width: `calc(100% - ${drawerWidth}px)`,height:'100vh',marginLeft:`${drawerWidth}px`}}>
      <h1>segundo box</h1>
      {opcionSeleccionada && showContent(opcionSeleccionada)} 
      </Box>
      
    </Box>
  );
};

export default Dashboard;
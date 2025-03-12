import React, { useEffect, useState } from "react";
import style from "./NavBar.module.css"
//import icon_gorilla from "../../assests/icon_gorilla.png"
import { useSectionStore } from "../../store/useSectionStore";
import {  useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert, Snackbar, styled, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton ,
    List, ListItem, ListItemText
} from "@mui/material";
import { useLogginStore } from "../../store/useLogginStore";
import logo from '../../../src/assests/imagenes/logo.png';

import { height, width } from "@mui/system";




const NavBar = ({setOpendrawer}) => {
    const { getSections, sections } = useSectionStore();
    const {setLoggin} = useLogginStore();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    console.log(sections);

    const handleClick = () => {
        const token = Cookies.get('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.rol === "Master") {
                navigate("/master"); // Redirige al dashboard de Master
            } else {
                navigate("/usuario"); // Redirige al dashboard de Usuario
            }
        } else {
            // Si no hay token, mostrar el formulario de login
            setLoggin(true);
        }
    };

    const handleMenuClick = () => {
        setOpendrawer(true);
    };

    useEffect(() => {
        getSections();
    }, [getSections])

    return (
        <NavBarContainer >
            <LogoContainer >
                <Logo>
                <Typography sx={{fontFamily:'Nunito',fontSize:'30px', fontWeight:'bold'}}>Gym</Typography>
                <Typography sx={{fontFamily:'Nunito', fontSize:'30px', fontWeight:'bold',color:'#C004FF'}}>pall</Typography>
                </Logo>
            </LogoContainer>
            {isMobile ? (
                <IconButton sx={{padding:'0px'}} onClick={handleMenuClick}>
                    <MenuIcon  fontSize="large" />
                </IconButton>

            ) : (
                <MenuItemsContainer >
                   <MenuItems>
                    <MenuItem>Inicio</MenuItem>
                    <MenuItem>Sobre nosotros</MenuItem>
                    <MenuItem>Precios</MenuItem>
                    <MenuItem>Registrarse </MenuItem>
                    <MenuItem onClick={() => { handleClick(setLoggin) }}>Iniciar sesión</MenuItem>
                   </MenuItems>
                   
                </MenuItemsContainer>
            )}


        </NavBarContainer>
    )
}
export default NavBar;

const NavBarContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 16px',
    background: 'white',
    marginBottom: '25px',
   // marginTop: '25px',
    boxSizing: 'border-box',
    zIndex:'10',
    
   
  
    [theme.breakpoints.up('md')]: {
      width: '100%',
      padding:'0 120px'
    },
  }));

  const LogoContainer = styled(Box)(({ theme }) => ({
    padding:'0',
    width: 'auto',
    height: '68px', 
    display:'flex',
    justifyContent:'flex-start',
   
  
    [theme.breakpoints.up('md')]: {
    
    },
  }));

  const Logo = styled(Box)(({ theme }) => ({
    width:'auto',
    height:'100%',
    padding:'0',
    display: 'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
   
  
    [theme.breakpoints.up('md')]: {
    
    },
  }));

  const MenuItemsContainer = styled(Box)(({ theme }) => ({
    width:'50%',
    height:'68px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    boxSizing:'border-box',
   
  
    [theme.breakpoints.up('md')]: {
        
    },
  }));

  const MenuItems = styled(List)(({ theme }) => ({
    width:'100%',
    height:'100%',
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    fontFamily:'Nunito',
    fontSize:'24px',
    fontWeight:'medium',
    boxSizing:'border-box',
    //border: '1px solid red',
    
   
   
  
    [theme.breakpoints.up('md')]: {
        
    },
  }));

  const MenuItem = styled(ListItem)(({ theme }) => ({
    width:'auto',
    cursor: 'pointer',
    position: 'relative', // Necesario para el pseudo-elemento ::after
    transition: 'color 0.3s ease', // Transición para el color
    //border:'1px solid blue',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    padding:'0',
    boxSizing:'border-box',
    
    '&:hover': {
        color: 'black', // Color púrpura en el hover
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        width: '0',
        height: '2px',
        bottom: '0',
        left: '0',
        
        backgroundColor: '#C004FF', // Color púrpura para el subrayado
        transition: 'width 0.3s ease', // Transición para la animación del subrayado
       
    },
    '&:hover::after': {
        width: '100%', // Expande el subrayado en hover
    },
   
  
    [theme.breakpoints.up('md')]: {
        
    },
  }));



{/* <li>
<a href="#" className={style.link}>Inicio</a>
</li>
<li>
<a href="#" className={style.link}>Actividades</a>
</li>
<li>
<a href="#" className={style.link}>Sedes</a>
</li>
<li>
<a href="#" className={style.link}>Contacto</a>
</li>
<li>
<a href="#" className={style.link}>Sobre Nosotros</a>
</li> */}


{/* <ul className={style.menu}>
{sections.map(section => (
    <li key={section.id}>
        <a href={section.id} className={style.link}>{section.name}</a>
    </li>
))}
</ul> */}
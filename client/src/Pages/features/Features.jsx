import React, { useState, useEffect, useRef,forwardRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import { Box, Button, Card, TextField, Typography, styled,useMediaQuery, useTheme  } from '@mui/material';
import { borderRadius, fontFamily, fontSize, fontWeight, height, maxHeight, maxWidth, padding, textAlign, width } from "@mui/system";
import editPicture from '../../../src/assests/imagenes/userEdit.png';
import crearRutina from '../../../src/assests/imagenes/crearRutina.png';
import editarRutina from '../../../src/assests/imagenes/editarRutina.png';
import generarPago from '../../../src/assests/imagenes/generarPago.png';
import buscarPagos from '../../../src/assests/imagenes/buscarPagos.png';
import LogginForm from "../../Components/logginForm/LogginForm";
import { useLogginStore } from "../../store/useLogginStore";
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie'; 
import LandingDrawer from "../../Components/landingDrawer/LandingDrawer";

const Features = forwardRef (({setVerifiedUser,handleMenuClick,openDrawer,setOpendrawer,closeDrawer,menuItems,handleClick},refForm) => {
  const {logginResponse,postLoggin,LogginFormOpen,setLoggin} = useLogginStore();
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRef();  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 

  console.log(openDrawer);
  console.log(menuItems);
  console.log('referencia',refForm);
  
  
  
  useEffect(() => {
    console.log("Current Pathname:", location.pathname); // Esto imprimirá el pathname actual en la consola
  }, [location]); // Dependemos de location para que se actualice si cambia la ruta

  useEffect(() => {
      if (logginResponse && logginResponse.token) {
          const token = logginResponse.token;
          const decodedToken = jwtDecode(token);
                   
          Cookies.set('token', token, { expires: 1 }); // Guarda la cookie por 1 día
      
          if (logginResponse.user) {
              //setVerifiedUser(logginResponse.user);
      
              if (decodedToken.rol === "Master") {
                  navigate("/master");
              } else {
                  navigate("/usuario");
              }
          } else {
              //setMessage(logginResponse.successMessage);  // Mostrar mensaje si no hay usuario
          }
      }
  }, [logginResponse, navigate]);

  const handleOverlayClick = (e) => {
     
      if (refForm.current && !refForm.current.contains(e.target)) {
          setLoggin(false);  
      }
  };
  
  useEffect(() => {
      if (LogginFormOpen) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        }); 
      }
    }, [LogginFormOpen]); 

  return (
   <FeaturesMainContainer>
    <NavBar setOpendrawer={setOpendrawer}menuItems={menuItems}/>
    {openDrawer && <LandingDrawer open={openDrawer} close={closeDrawer} menuItems={menuItems} handleClick={handleClick} />}
    {LogginFormOpen && (
                <LogginFormOverlay onClick={handleOverlayClick}>
                    <LogginForm ref={refForm}setVerifiedUser={setVerifiedUser}/>
                </LogginFormOverlay>
            )}
    <CardsContainer>
    <FeatureContainer elevation={isMobile ? 0 : 4}>
      <CustomImg src={editPicture}/>
      <TextContainer>
      <CustomTitle className="custom-title">Edición de usuarios</CustomTitle>
      <Customtext>
      La funcionalidad "Editar Usuarios" permite a los administradores gestionar de manera eficiente los perfiles de usuarios registrados. A través de una interfaz intuitiva, se puede buscar, visualizar y editar datos como nombre, domicilio, correo y teléfono. Además, permite asignar actividades y desactivar usuarios sin eliminarlos, manteniendo la integridad de los datos mediante validaciones y confirmaciones. Optimizada para un rendimiento rápido, esta herramienta facilita la actualización de información y mejora la gestión de usuarios en pocos pasos.
      </Customtext>
      </TextContainer>
     
    </FeatureContainer>
    <FeatureContainer elevation={isMobile ? 0 : 4}>
      <CustomImg src={crearRutina}/>
      <TextContainer>
      <CustomTitle className="custom-title">Crear rutina</CustomTitle>
      <Customtext>
      Con esta funcionalidad puedes diseñar entrenamientos personalizados y completamente adaptados a tus necesidades o las de tus clientes. La funcionalidad te permite

 <CustomSpan> Seleccionar Días de Entrenamiento</CustomSpan>, elige los días de la semana para cada sesión.
<CustomSpan> Añadir Ejercicios Detallados</CustomSpan>, Selecciona los ejercicios y personaliza cada uno con series y repeticiones específicas.
<CustomSpan> Visualización Clara</CustomSpan>, Revisa tu rutina en una tabla organizada, donde verás cada ejercicio asignado a su día correspondiente, junto con los detalles de sets y repeticiones. 
<CustomSpan> Guardar y Modificar Rutinas</CustomSpan>, Almacena tu rutina para utilizarla o modificarla en cualquier momento.
      </Customtext>
      </TextContainer>
     
    </FeatureContainer>
    <FeatureContainer elevation={isMobile ? 0 : 4}>
      <CustomImg src={editarRutina}/>
      <TextContainer>
      <CustomTitle className="custom-title">Editar rutina</CustomTitle>
      <Customtext>
      Nuestra plataforma te permite personalizar y gestionar las rutinas de entrenamiento de manera sencilla y eficiente. Con nuestra herramienta de edición de rutinas, puedes

<CustomSpan> Agregar y eliminar días de entrenamiento</CustomSpan>, Personaliza tu rutina de acuerdo a tus necesidades, añadiendo o eliminando días de ejercicio de manera rápida.
<CustomSpan> Asignar ejercicios por día</CustomSpan>, Selecciona y asigna ejercicios a cada día de la rutina según los grupos musculares que desees trabajar.
<CustomSpan> Actualizar series y repeticiones</CustomSpan>, Modifica las series y repeticiones de cada ejercicio directamente desde la interfaz para adaptarlas a tu progreso o necesidades.
<CustomSpan> Verificación en tiempo real</CustomSpan>, La interfaz actualiza automáticamente los cambios realizados, permitiéndote ver al instante cómo se modifica tu rutina.
Con una experiencia de usuario optimizada, podrás gestionar tu rutina con facilidad, sin complicaciones.
      </Customtext>
      </TextContainer>
     
    </FeatureContainer>
    <FeatureContainer elevation={isMobile ? 0 : 4}>
      <CustomImg src={generarPago}/>
      <TextContainer>
      <CustomTitle className="custom-title">Nuevo pago</CustomTitle>
      <Customtext>
      La funcionalidad "Editar Usuarios" permite a los administradores gestionar de manera eficiente los perfiles de usuarios registrados. A través de una interfaz intuitiva, se puede buscar, visualizar y editar datos como nombre, domicilio, correo y teléfono. Además, permite asignar actividades y desactivar usuarios sin eliminarlos, manteniendo la integridad de los datos mediante validaciones y confirmaciones. Optimizada para un rendimiento rápido, esta herramienta facilita la actualización de información y mejora la gestión de usuarios en pocos pasos.
      </Customtext>
      </TextContainer>
     
    </FeatureContainer>
    <FeatureContainer elevation={isMobile ? 0 : 4}>
      <CustomImg src={buscarPagos}/>
      <TextContainer>
      <CustomTitle className="custom-title">Listar pagos</CustomTitle>
      <Customtext>
      La funcionalidad "Editar Usuarios" permite a los administradores gestionar de manera eficiente los perfiles de usuarios registrados. A través de una interfaz intuitiva, se puede buscar, visualizar y editar datos como nombre, domicilio, correo y teléfono. Además, permite asignar actividades y desactivar usuarios sin eliminarlos, manteniendo la integridad de los datos mediante validaciones y confirmaciones. Optimizada para un rendimiento rápido, esta herramienta facilita la actualización de información y mejora la gestión de usuarios en pocos pasos.
      </Customtext>
      </TextContainer>
     
    </FeatureContainer>
    
    </CardsContainer>
   
   </FeaturesMainContainer>
   
  );
});

export default Features;

const FeaturesMainContainer = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100%",
  boxSizing: "border-box",
  padding: '0 16px',
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
    

 

  [theme.breakpoints.up('md')]: {
    height:'100%',
     padding:' 0 120px',
      overflowX: 'hidden',
    },
  
}));

const CardsContainer = styled(Box)(({ theme }) => ({
  width:'100%',
  height:'100%',
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'space-between',
  boxSizing:'border-box',
  marginTop:'150px',

  
 

  [theme.breakpoints.up('md')]: {
    width:'100%',
    
    overflowX:'hidden',
    overflowY:'auto',
    
    

    
    },
  
}));

const FeatureContainer = styled(Box)(({ theme }) => ({
//  marginTop:'150px',
  width: "100%",
  height: "auto",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap:'20px',
 // border:'1px solid black',
  backgroundColor: "white",
  padding:'15px',
  
  
 

  [theme.breakpoints.up('md')]: {
     width:'100%',
    // maxWidth:'100%',
      padding:'0',
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'space-between',
     marginBottom:'100px',
     padding:'10px',
     cursor:'pointer',
    //  border:'2px solid #C004FF',
    border:'2px solid black',
     borderRadius:'5px',
    
     '&:hover': {
   
    '& .custom-title::after': {
      width: '100%', // Expande la línea bajo el título al hacer hover
    },
  },
     
    },
  
}));

const CustomImg = styled('img')(({ theme }) => ({
  width:'100%',
  maxWidth: '100%',
  //height:'100%',
   // padding:'5px',
    boxSizing:'border-box',
  
 

  [theme.breakpoints.up('md')]: {
    width:'35%',
   // maxHeight:'700px',
    //borderRadius:'100px',
    //height:'300px',
    },
  
}));
const TextContainer = styled(Box)(({ theme }) => ({
  width:'100%',
  height:'auto',
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  gap:'10px',
  boxSizing:'border-box',
 
  
 

  [theme.breakpoints.up('md')]: {
    width:'50%',
    height:'90%',
    padding:'5px',
    gap:'20px'

    //borderRadius:'100px',
    //height:'300px',
    },
  
}));

const CustomTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  fontFamily: 'nunito',
  fontSize: '30px',
  fontWeight: 'bold',
  textAlign: 'center',

  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0',
    height: '3px', // Altura de la línea
    bottom: '-1px', // Posiciona la línea justo debajo del texto
    left: '0',
    backgroundColor: "#C004FF", // Color violeta
    transition: 'width 0.3s ease-in-out',
  },

  [theme.breakpoints.up('md')]: {
    fontSize: '35px',
  },
}));

const Customtext = styled(Typography)(({ theme }) => ({
  width:'100%',
  fontFamily:'nunito',
  fontSize:'16px',
  fontWeight:'400',
  textAlign:'center',
  marginBottom:'10px',
  
 

  [theme.breakpoints.up('md')]: {
    fontSize:'20px'


    
    },
  
}));

const CustomSpan = styled('span')(({ theme }) => ({
 
  fontWeight: 'bold',
  fontStyle: 'italic',
  display: 'inline', // Asegura que el span no se expanda como un bloque
  wordBreak: 'break-word', // Para que el texto no se desborde


  
}));

const LogginFormOverlay = styled(Box)(({ }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
}));


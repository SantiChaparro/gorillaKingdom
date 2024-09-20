import React, { useEffect } from 'react';
import UserNavBar from '../../../Components/UserNavBar';
import { Box, styled, Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';  // Importa js-cookie

const UserDashBoard = ({ handleMenuClick, onClose, opendrawer, verifiedUser,setVerifiedUser }) => {
  useEffect(() => {
    if (verifiedUser) {
      console.log(verifiedUser);
    } else {
      console.log("cargando....");
    }


  }, [verifiedUser])

  useEffect(() => {
    const token = Cookies.get('token'); 
    console.log(token);
     // Obtener la cookie del token si existe
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
              // Decodificar el token
            const currentTime = Date.now() / 1000;  // Obtener la hora actual en formato UNIX
            if (decodedToken.exp > currentTime) {   // Comparar con el tiempo de expiración
                setVerifiedUser(decodedToken.user);  // Establecer el usuario verificado
              
            }
        } catch (error) {
            console.error("Error al decodificar el token:", error);
            Cookies.remove('token');  // Remover el token si es inválido
        }
    }
}, [setVerifiedUser]);

  return (
    <MainContainer>
      <UserNavBar handleMenuClick={handleMenuClick} opendrawer={opendrawer} />
      <Box sx={{width:'100%', display:'flex', alignItems:'center',justifyContent:'center'}}>
        <Typography sx={{ color: 'white', marginTop: '100px' }}>{`bienveni@ ${verifiedUser.nombre}`}</Typography>
      </Box>

    </MainContainer>
  );
};

export default UserDashBoard;

const MainContainer = styled(Box)(({ theme }) => ({
  margin: 0,
  padding: '15px',
  width: '100%',
  height:'100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'black',
  overflow: 'hidden',
  boxSizing:'border-box'
}));

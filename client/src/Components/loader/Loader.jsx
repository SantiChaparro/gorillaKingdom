import React from 'react';
import { CircularProgress, Box, styled } from '@mui/material';

const LoaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'auto', // Puedes ajustar esto según dónde quieras usar el loader
  //backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fondo oscuro semi-transparente
  marginTop:'200px'
}));

const Loader = () => {
  return (
    <LoaderContainer>
      <CircularProgress 
        size={80} // Tamaño del loader
        thickness={3} // Grosor del loader
        sx={{
          color: 'violet', // Color personalizado
          animationDuration: '1.5s', // Velocidad de la animación
        //  backgroundColor:'trasnparent'
        }}
      />
    </LoaderContainer>
  );
};

export default Loader;
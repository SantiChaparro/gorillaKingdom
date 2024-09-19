import React, { useEffect } from 'react';
import UserNavBar from '../../../Components/UserNavBar';
import { Box, styled, Typography } from '@mui/material';

const UserDashBoard = ({ handleMenuClick, onClose, opendrawer, verifiedUser }) => {
  useEffect(() => {
    if (verifiedUser) {
      console.log(verifiedUser);
    } else {
      console.log("cargando....");
    }


  }, [verifiedUser])

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

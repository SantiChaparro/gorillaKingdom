import React from 'react';
import UserNavBar from '../../../Components/UserNavBar';
import { Box, styled } from '@mui/material';

const UserDashBoard = ({ handleMenuClick, onClose, opendrawer }) => {
  return (
    <MainContainer>
      <UserNavBar handleMenuClick={handleMenuClick} />
    </MainContainer>
  );
};

export default UserDashBoard;

const MainContainer = styled(Box)(({ theme }) => ({
  margin: 0,
  padding: '15px',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'black',
}));

import React, { useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, ButtonBase, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';

const UserNavBar = ({ handleMenuClick, handleMasterDrawer }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [onclickFunction, setOnclickFunction] = useState(null);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (location.pathname.startsWith('/usuario')) {
      setOnclickFunction(() => handleMenuClick);
    } else if (location.pathname.startsWith('/master')) {
      setOnclickFunction(() => handleMasterDrawer);
    }
  }, [location.pathname, handleMenuClick, handleMasterDrawer]);


  const shouldRenderBackButton = !['/usuario', '/master'].includes(location.pathname);

  return (
    <CustomAppBar>
      <Toolbar>
        <ToolBarContent>
          {shouldRenderBackButton && (
            <ButtonBase onClick={handleBack}>
              <ArrowBackIcon fontSize="large" />
            </ButtonBase>
          )}
          <Spacer />
          <ButtonBase onClick={onclickFunction}>
            <MenuIcon fontSize="large" />
          </ButtonBase>
        </ToolBarContent>
      </Toolbar>
    </CustomAppBar>
  );
};

export default UserNavBar;

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  backgroundColor: 'black',
}));

const ToolBarContent = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  display: 'flex',
  alignItems: 'center',
}));

const Spacer = styled('div')(({ theme }) => ({
  flexGrow: 1,
}));

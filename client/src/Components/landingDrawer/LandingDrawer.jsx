import React, { useEffect } from "react";
import { Box, Drawer, ListItem, ButtonBase, ListItemText, Typography, styled,Slide } from '@mui/material';
import { useSectionStore } from "../../store/useSectionStore";

const LandingDrawer = ({ open, close , sections, menuItems}) => {
    // const { getSections, sections } = useSectionStore();

    // useEffect(() => {
    //     getSections();
    // }, [getSections]);

    console.log('desde el drawer',menuItems);
    
    // const handleClick = (sectionId) => {
    //     const section = document.getElementById(sectionId);
    //     if (section) {
    //       // Hacer scroll a la sección
    //       section.scrollIntoView({ behavior: "smooth" });
          
    //       // Cerrar el Drawer
    //       close();
    //     }
    //   }

    return (


        <CustomDrawer
            open={open}
            onClose={close}
            anchor="left"
         
        >
            <DrawerContent open={open}>
                {menuItems?.map(item => (
                    <ButtonBase key={item.label} onClick={item.onClick} sx={{ width: '100%', color: 'black' }}>
                        <StyledListItem>
                            <ListItemText>
                                {item.label}
                            </ListItemText>
                        </StyledListItem>
                    </ButtonBase>
                ))}
            </DrawerContent>
        </CustomDrawer>
    );
};

export default LandingDrawer;

const drawerWidth = '240px';

const CustomDrawer = styled(Drawer)(({ theme }) => ({
    '& .MuiDrawer-paper': {
        width: drawerWidth,
        // backdropFilter: 'blur(7px)',
        // backgroundColor: 'rgba(255, 255, 255, 0.1)',
        // color: '#fff',
        // borderRight: '1px solid rgba(255, 255, 255, 0.2)',
        transition: 'transform 0.3s ease-out',
    },
}));

const DrawerContent = styled(Box)(({ open }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%', // Para asegurar que ocupe toda la altura
    width: '100%', // Para asegurar que ocupe todo el ancho
    backgroundColor:'white',
    
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  }));

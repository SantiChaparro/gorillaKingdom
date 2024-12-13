import React, { useEffect } from "react";
import { Box, Drawer, ListItem, ButtonBase, ListItemText, Typography, styled,Slide } from '@mui/material';
import { useSectionStore } from "../../store/useSectionStore";

const LandingDrawer = ({ open, close , sections}) => {
    // const { getSections, sections } = useSectionStore();

    // useEffect(() => {
    //     getSections();
    // }, [getSections]);

    console.log('desde el drawer',sections);
    
    const handleClick = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          // Hacer scroll a la sección
          section.scrollIntoView({ behavior: "smooth" });
          
          // Cerrar el Drawer
          close();
        }
      }

    return (


        <CustomDrawer
            open={open}
            onClose={close}
            anchor="right"
         
        >
            <DrawerContent open={open}>
                {sections?.map(section => (
                    <ButtonBase key={section.id}  onClick={() => handleClick(section.id)}>
                        <StyledListItem>
                            <ListItemText>
                                
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
        backdropFilter: 'blur(7px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
        borderRight: '1px solid rgba(255, 255, 255, 0.2)',
    },
}));

const DrawerContent = styled(Box)(({ open }) => ({
  
    height: '100%', // Para asegurar que ocupe toda la altura
    width: '100%', // Para asegurar que ocupe todo el ancho
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  }));

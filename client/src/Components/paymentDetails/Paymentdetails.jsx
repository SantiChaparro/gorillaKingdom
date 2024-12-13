import React from "react";
import { Box, Modal, Button, Typography, styled } from "@mui/material";

const Paymentdetails = ({ open, handleModalClose, selectedDetail }) => {

    return (
        <Box sx={{  
            width:'100%', 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing:'border-box',
            padding: '20px',
            '& .MuiDialog-paper': {
                backgroundColor: 'white', 
                borderRadius: '10px',
                maxWidth: '600px', // Limita el ancho del modal
                maxHeight: '80vh', // Limita la altura del modal para que no salga de la pantalla
                overflowY: 'auto', // Agrega scroll si el contenido es demasiado largo
            }, }}>
            <CustomModal
                open={open}
                onClose={handleModalClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <ModalContent>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Detalle pago - {`${selectedDetail?.User?.nombre}`}
                    </Typography>
                    <Box id="modal-description" sx={{ mt: 2 }}>
                        {selectedDetail?.Activities?.map(activity => (
                            <Box key={activity.id} sx={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                                <Typography>{activity.nombre}</Typography>
                                <Typography>{activity.costo}</Typography>
                            </Box>
                        ))}
                    </Box>
                    <Button onClick={handleModalClose} sx={{ mt: 3 }} variant="contained">
                        Cerrar
                    </Button>
                </ModalContent>
            </CustomModal>
        </Box>
    );
};

export default Paymentdetails;

const CustomModal = styled(Modal)(({ theme }) => ({
    width:'100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ModalContent = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    padding: '20px',
    maxWidth: '500px',    // Ancho máximo del modal
    width: '80%',
    maxHeight: '90vh',    // Alto máximo para evitar desbordamiento
    overflowY: 'auto',    // Scroll automático si el contenido es demasiado alto
    boxShadow: theme.shadows[5],
    textAlign: 'center',
}));

import React from 'react';
import { Box, Typography, Button, styled } from '@mui/material';

const RoutineDisplay = ({ dayValue, exercisesId, exercises, routineDetail, handleRemove, handleAddDay }) => {
    return (
        <ExerciseMainContainer>
            <CustomTypography variant="h6" sx={{fontFamily:'Nunito',fontWeight:'400', textDecoration:'underline'}}>Rutina del Día {dayValue}</CustomTypography>
            <ExerciseContainer>
            {exercisesId.map(exerciseId => {
                const exercise = exercises.find(ex => ex.id === exerciseId);
                const detail = routineDetail.find(detail => detail.id === exerciseId);
                return (
                        <Box sx={{width:'100%',display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                             <Typography key={exerciseId} sx={{ color: 'black' }}>
                            {exercise.nombre} - {detail?.setsAndReps}
                        </Typography>
                        <Button onClick={() => handleRemove(exerciseId)} sx={{ color: 'black' }}>ELIMINAR</Button>
                 
                        </Box>
                       
                );
            })}
            </ExerciseContainer>
           
            <Button 
                onClick={handleAddDay} 
                variant='contained' 
                sx={{
                    background: 'linear-gradient(45deg, #C004FF, #730399)',
                    color: 'white',
                    marginTop: '10px',
                    height: '50px',
                  
                    '&:hover': {
                        backgroundColor: '#0028ff' // mantener el color azul en hover
                    }
                }}
            >
                AGREGAR A RUTINA
            </Button>
        </ExerciseMainContainer>
    );
};

export default RoutineDisplay;

const ExerciseContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height:'150px',
    padding:'5px',
    display: 'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    overflowY: 'auto', 
    //backgroundColor:'white',
   
}));

const ExerciseMainContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    boxSizing: 'border-box',
    background: 'white', // Fondo semi-transparente
   // backdropFilter: 'blur(20px)', // Efecto esmerilado
    borderRadius: '5px',
    //border: '1px solid rgba(255, 255, 255, 0.3)', // Bordes con un toque de transparencia
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "Bebas Neue",
    fontWeight: '300',
    fontSize: '1.5em',
    color: 'black'
}));

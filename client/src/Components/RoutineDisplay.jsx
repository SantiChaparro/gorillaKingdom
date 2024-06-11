import React from 'react';
import { Box, Typography, Button, styled } from '@mui/material';

const RoutineDisplay = ({ dayValue, exercisesId, exercises, routineDetail, handleRemove, handleAddDay }) => {
    return (
        <ExerciseMainContainer>
            <CustomTypography variant="h6">Rutina del Día {dayValue}</CustomTypography>
            {exercisesId.map(exerciseId => {
                const exercise = exercises.find(ex => ex.id === exerciseId);
                const detail = routineDetail.find(detail => detail.id === exerciseId);
                return (
                    <ExerciseContainer key={exerciseId}>
                        <Typography sx={{ color: 'white' }}>
                            {exercise.nombre} - {detail?.setsAndReps}
                        </Typography>
                        <Button onClick={() => handleRemove(exerciseId)} sx={{ color: 'white' }}>ELIMINAR</Button>
                    </ExerciseContainer>
                );
            })}
            <Button 
                onClick={handleAddDay} 
                variant='contained' 
                sx={{
                    backgroundColor: '#0028ff',
                    color: 'white',
                    marginTop: '30px',
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
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    boxSizing: 'border-box',
    borderBottom: '1px solid blue'
}));

const ExerciseMainContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
    border: '1px solid blue',
    padding: '10px',
    boxSizing: 'border-box',
    borderRadius: '5px'
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "Bebas Neue",
    fontWeight: '400',
    fontSize: '3em',
    color: 'white'
}));

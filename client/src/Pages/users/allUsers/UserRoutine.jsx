import React, { useState, useEffect } from 'react';
import UserNavBar from '../../../Components/UserNavBar';
import { Box, Typography, styled, Select, MenuItem, FormControl, InputLabel, TextField, Button, CircularProgress,Card,CardMedia } from '@mui/material';
import { useRoutinesStore } from '../../../store/useRoutinesStore';
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";
import Swal from 'sweetalert2';
import trainingImage from '../../../assests/imagenes/womenLift.jpg';

const UserRoutine = ({ handleMenuClick, verifiedUser}) => {
  const { getRoutine, modifyRoutine, routines } = useRoutinesStore();
  const [option, setOption] = useState("");
  const [selectedDayRoutine, setSelectedDayRoutine] = useState(null);
  const [routine, setRoutine] = useState({});
  const [updateData, setUpdateData] = useState({});


  let dni = verifiedUser.dni;
  
  console.log(routine);
  console.log(updateData);
  console.log(verifiedUser);
  
  
  useEffect(()=>{
    const token = Cookies.get("token")
    if(token){
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.user.dni);
      dni = decodedToken.user.dni
    }
    
  },[])

   
  useEffect(() => {
    handleRoutine(dni);
   
  }, []);


  
  useEffect(() => {
    const updateRoutineDetails = async () => {
      // Verificar si routine y routine.routine están definidos
      if (routine?.routine?.routineDetail?.length > 0) {
        console.log(routine.routine.routineDetail);

        const initialUpdateData = {};
        routine.routine.routineDetail.forEach(detail => {
          initialUpdateData[detail.id] = detail.weights;
          console.log(initialUpdateData);
          
        });

        // Actualiza updateData con los detalles de rutina
        setUpdateData(prevState => ({
          ...prevState,
          ...initialUpdateData
        }));
      }
    };

    updateRoutineDetails();
  }, [routine]);

  const handleChange = (event) => {
    const selectedDay = event.target.value;
    setOption(selectedDay);
  
    // Encuentra el día de la rutina seleccionado
    const dayRoutine = routine.routine.DayOfWeeks.find(day => day.id === selectedDay);
    
    // Imprime el día de la rutina seleccionado
 
    if (dayRoutine) {
      // Obtén los IDs de los ejercicios filtrados
      const filteredExerciseIds = routine.filteredExercises.map(exercise => exercise.ExerciseId);
        
      // Filtra los ejercicios de `dayRoutine` basándote en los IDs filtrados
      const filteredExercisesForDay = dayRoutine.Exercises.filter(exercise => 
        filteredExerciseIds.includes(exercise.id)
      );
  
      // Actualiza el estado con los ejercicios filtrados
      setSelectedDayRoutine({
        ...dayRoutine,
        Exercises: filteredExercisesForDay
      });
    }
  };
  

  const handleRoutine = async (dni) => {
   const response = await getRoutine(dni);
  // console.log(response);
   
    setRoutine(response)
    
  };

  const getExerciseDetails = (exerciseId) => {
    const detail = routine.routine.routineDetail.find(detail => detail.id === exerciseId);
    console.log('detalle rutina',detail);

    return detail
    
  };

  const handleTextFieldChange = (exerciseId, weekIndex, value) => {
    setUpdateData(prevState => ({
      ...prevState,
      [exerciseId]: {
        ...prevState[exerciseId],
        [`week${weekIndex + 1}`]: value
      }
    }));
  };

  const handleSaveChanges = async () => {
    
    const updatedRoutine = {
      id: routine.routine.id, 
      updateData
    };

    const newRoutine = await modifyRoutine(updatedRoutine);

    if(newRoutine){
      Swal.fire({
          icon: 'success',
          title: 'Excelente!',
          text: 'Se guardaron tus cambios.',
          showConfirmButton: true,
         // timer: 2000
      });
      
     }else{
      Swal.fire({
          icon: 'error',
          title: 'Upss!',
          text: 'Hubo un problema, intenta de nuevo.',
          showConfirmButton: true,
         // timer: 2000
      });
     }
  };
  console.log(selectedDayRoutine);
  
  return (
    <MainContainer>
      <UserNavBar handleMenuClick={handleMenuClick} />
      <TitleContainer>
        <CustomTypography variant='h3'>¿Qué entrenamos hoy?</CustomTypography>
      </TitleContainer>
      <FormControl fullWidth variant="outlined" sx={{ mt: 3 }}>
        <CustomInputLabel id="day-select-label">¿Qué día vas a entrenar?</CustomInputLabel>
        <CustomSelect
          labelId="day-select-label"
          id="day-select"
          value={option}
          onChange={handleChange}
          label="¿Qué día vas a entrenar?"
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: 'black',
                '& .MuiMenuItem-root': {
                  textAlign: 'center',
                  fontSize: '1.2rem',
                  color: 'white',
                },
              },
            },
          }}
        >
          {routine?.routine?.DayOfWeeks && routine.routine.DayOfWeeks.map((day) => (
            <MenuItem  key={day.id} value={day.id}>{`Día ${day.id}`}</MenuItem>
          ))}
        </CustomSelect>
      </FormControl>
      <ExerciseContainer>
        {selectedDayRoutine && selectedDayRoutine.Exercises && selectedDayRoutine.Exercises.length > 0 ? (
          selectedDayRoutine.Exercises.map((exercise, index) => {
            const details = getExerciseDetails(exercise.id);
            console.log(details);
            
            return (
              <Exercise key={index}>
                <ExcercieDescription>
                  <Typography variant='body1' color='white'>
                    {exercise.nombre}
                  </Typography>
                  {details && (
                    <Typography variant='body2' color='gray'>
                      {details.setsAndReps}
                    </Typography>
                  )}
                </ExcercieDescription>
                <ExerciseLoad>
                  {Array.from({ length: 4 }).map((_, weekIndex) => (
                    <CustomTextField
                    key={weekIndex}
                    size="small"
                    variant="outlined"
                    value={updateData[exercise.id]?.[`week${weekIndex + 1}`] || ""}
                    onChange={(e) => handleTextFieldChange(exercise.id, weekIndex, e.target.value)}
                  />
                  ))}
                </ExerciseLoad>
              </Exercise>
            );
          })
        ) : (
          <Typography variant='body1' color='white'>No hay ejercicios para el día seleccionado</Typography>
        )}
      </ExerciseContainer>
      {selectedDayRoutine && selectedDayRoutine.Exercises && selectedDayRoutine.Exercises.length > 0 ?
      <CustomButton onClick={handleSaveChanges}>GUARDAR CAMBIOS</CustomButton> : null}
    </MainContainer>
  );
};

export default UserRoutine;

const MainContainer = styled(Box)(({ theme }) => ({
  margin: 0,
  padding: '15px',
  width: '100vw',
  height: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'black',
  boxSizing: 'border-box'
}));

const TitleContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '80px',
  textAlign: 'center'
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  width: '100%',
  fontFamily: 'Bebas Neue',
  fontWeight: '400',
  fontStyle: 'normal',
  color: 'white',
  marginBottom: '40px'
}));

const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
  color: 'white',
  textAlign: 'left',
  width: '100%',
  transformOrigin: 'left',
  '&.Mui-focused': {
    transformOrigin: 'left',
  },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  color: 'white',
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'white',
  },
  '.MuiSvgIcon-root': {
    color: 'white',
  },
}));

const ExerciseContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  marginTop: '100px',
  display: 'flex',
  flexDirection: 'column',
}));

const Exercise = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  padding: '15px 0',
  marginBottom: '5px',
  borderBottom: '3px solid #0028ff',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px'
}));

const ExcercieDescription = styled(Box)(({ theme }) => ({
  width: '40%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}));

const ExerciseLoad = styled(Box)(({ theme }) => ({
  width: '60%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
}));

const CustomTextField = styled(TextField)(({ theme }) => ({
  width: '50px',
  padding: '0',
  '& .MuiOutlinedInput-input': {
    padding: '8px',
    textAlign: 'center',
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    height: '50px',
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-underline:hover:before': {
    borderBottomColor: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
  },
  '& .Mui-focused .MuiOutlinedInput-input': {
    color: 'white',
  },
  border: '2px solid white',
  borderRadius: '5px',
}));

const CustomButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '60px',
  color: 'white',
  backgroundColor: '#0028ff',
  marginTop: '150px',
  '&:hover': {
    backgroundColor: '#0028ff',
  },
  '&:active': {
    backgroundColor: '#0028ff',
  },
  '&:focus': {
    backgroundColor: '#0028ff',
  },
}));

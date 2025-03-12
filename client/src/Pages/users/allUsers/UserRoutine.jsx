import React, { useState, useEffect } from 'react';
import UserNavBar from '../../../Components/UserNavBar';
import { Box, Typography, styled, Select, MenuItem, FormControl, InputLabel, TextField, Button, CircularProgress,Card,CardMedia } from '@mui/material';
import { useRoutinesStore } from '../../../store/useRoutinesStore';
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";
import Swal from 'sweetalert2';
import trainingImage from '../../../assests/imagenes/womenLift.jpg';

const UserRoutine = ({ handleMenuClick, verifiedUser,selectedTenants}) => {
  const { getRoutine, modifyRoutine, routines } = useRoutinesStore();
  const [option, setOption] = useState("");
  const [selectedDayRoutine, setSelectedDayRoutine] = useState(null);
  const [routine, setRoutine] = useState({});
  const [updateData, setUpdateData] = useState({});
  const [dni,setDni] = useState("");
  const [tenant,setTenant] = useState("");
  console.log('selectedtenant desde userroutine',selectedTenants);
  
  console.log('tenantid',tenant);
  console.log('userdni',dni);
  console.log(routines);
  
  
  



  //let dni = verifiedUser.dni;
  
  console.log(routine);
  console.log(updateData);
  console.log(verifiedUser);
  
  
  useEffect(()=>{
    const token = Cookies.get("token")
    if(token){
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.user.dni);
      console.log(decodedToken);
      
      //const dni = decodedToken.user.dni;
      setDni(decodedToken.user.dni);
      setTenant(selectedTenants);
     // const tenant = decodedToken.tenantsData[0].id;
    }
    
  },[])

   
  useEffect(() => {
    if(dni && tenant){
      handleRoutine(dni,tenant);
    }
    
   
  }, [dni,tenant]);

  useEffect(() => {
    if (routine.message === "Pago pendiente") {
      Swal.fire({
        icon: 'warning',
        title: 'Pago pendiente',
        text: routine.message,
        showConfirmButton: true,
      });
    }
}, [routine]);
  
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
  

  const handleRoutine = async (dni,tenant) => {
   const response = await getRoutine(dni,tenant);
   console.log(response);
   
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
        <CustomInputLabel sx={{color:'black'}} id="day-select-label">¿Qué día vas a entrenar?</CustomInputLabel>
        <CustomSelect
          labelId="day-select-label"
          id="day-select"
          value={option}
          onChange={handleChange}
          label="¿Qué día vas a entrenar?"
          sx={textFieldStyles}
  
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
                  <CustoTypografi variant='body1' color='white'>
                    {exercise.nombre}
                  </CustoTypografi>
                  {details && (
                    <CustoTypografi sx={{color:'gray'}}>
                      {details.setsAndReps}
                    </CustoTypografi>
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
                    sx={{
                      ...textFieldStyles,
                      maxWidth:'45px',
                      input: {
                        color: 'black', // Texto negro por defecto
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'black', // Borde negro por defecto
                        },
                        '&:hover fieldset': {
                          borderColor: '#C004FF', // Borde violeta en hover
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#C004FF', // Borde violeta en focus
                        },
                        '&.Mui-focused input': {
                          color: 'black', // Texto negro en focus
                        }
                      }
                    }}
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
 // margin: 0,
  padding: '15px',
  width: '100vw',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
 
  backgroundColor: 'white',
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
  fontFamily: "Nunito",
  //fontWeight: '400',
  fontSize: '35px',
  color: 'black',
  textAlign: 'center',
  marginBottom:'30px',
  fontWeight: 'bold',
}));

const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
  color: 'black', // color base negro
  textAlign: 'left',
  width: '100%',
  transformOrigin: 'left',
  '&.Mui-focused': {
    color: 'black', // color cuando está en foco
    //transformOrigin: 'left',
  },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  color: 'white',
  '.MuiOutlinedInput-notchedOutline': {
    borderColor: 'black',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: 'black',
  },
  '.MuiSvgIcon-root': {
    color: 'black',
  },
  // '.MuiInputBase-input': {
  //   textAlign: 'center', // Centrar el texto dentro del InputBase
  // },
}));

const ExerciseContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '470px',
  marginTop: '25px',
  display: 'flex',
  flexDirection: 'column',
  //justifyContent:'center',
  overflowY: 'auto',
  
}));

const Exercise = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  padding: '15px 0',
  marginBottom: '5px',
  borderBottom: '3px solid #C004FF',
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
  width: ' calc(100vw - 20px)',
  height: '60px',
  color: 'white',
  background: 'linear-gradient(45deg, #C004FF, #730399)',
  position:'absolute',
  bottom:'0px',
  //marginTop:'150px',
  marginBottom:'15px',
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

const textFieldStyles = {
  width: '100%',
 backgroundColor: 'white',
 borderRadius: '5px',
  '& .MuiInputBase-input': {
      color: 'black'
  },
  '& .MuiOutlinedInput-root': {
      '& fieldset': {
          borderColor: 'black',
      },
      '&:hover fieldset': {
          borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
          borderColor: 'black',
      },
  },
  '& .MuiInputLabel-root': {
      color: 'white',
  }
};

const CustoTypografi = styled(Typography)(({ theme }) => ({
 fontFamily:'nunito',
 color:'black',
 fontWeight:'bold'
}));
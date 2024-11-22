import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, MenuItem, Button, Alert, Snackbar, styled, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper } from "@mui/material";
import { useExercisesStore } from "../../../store/useExercisesStore";
import { useRoutinesStore } from "../../../store/useRoutinesStore";
import RoutineNavBar from '../../../../src/Components/routineNavBar/RoutineNavBar';
import MobileExerciseSelector from "../../../Components/MobileExerciseSelector";
import RoutineDisplay from "../../../Components/RoutineDisplay";
import UserNavBar from "../../../Components/UserNavBar";
import Swal from 'sweetalert2';
import { border, boxSizing, display, fontFamily, height, padding, width } from "@mui/system";
import createRoutineImage from '../../../assests/imagenes/createRoutine.png'



const CreateRoutine = ({ handleMasterDrawer }) => {
    const { exercises, fetchExercises } = useExercisesStore();
    const { succesMessage, errorMessage, emptyMessages, postRoutine } = useRoutinesStore();
    const [routineObj, setRoutineObj] = useState({ userId: "", days: [] });
    const [dayValue, setDayValue] = useState("");
    const [exercisesId, setExercisesId] = useState([]);
    const [userId, setUserId] = useState("");
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [detailValue, setDetailValue] = useState({});
    const [routineDetail, setRoutineDetail] = useState([]);
    const [disable, setDisable] = useState(null);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");
    const [currentExercise, setCurrentExercise] = useState(null);
    const [routineDisplay , setRoutineDisplay] = useState([]);

    console.log(routineObj);
    console.log('error',errorMessage);
    console.log(succesMessage);
    console.log(exercises);
    console.log('routinedisplay',routineDisplay)
    console.log(routineDisplay);
    
    
    

    useEffect(() => {
        fetchExercises();
        setRoutineDetail(Object.values(detailValue));
       // handleRoutineDisplay();
        //handleMessage();
    }, [detailValue,routineObj]);

    useEffect(() => {
        // Observar cambios en los mensajes de éxito o error
        if (succesMessage) {
          Swal.fire({
            icon: "success",
            title: "Excelente!",
            text: succesMessage,
            showConfirmButton: true,
          });
          
          emptyMessages();
        }
    
        if (errorMessage) {
          Swal.fire({
            icon: "error",
            title: "Upss!",
            text: errorMessage,
            showConfirmButton: true,
          });
         
          emptyMessages();
        }
      }, [succesMessage, errorMessage, emptyMessages]);

   
      const handleAddDay = () => {
        const dayObj = { dayId: dayValue, exercisesId, routineDetail };
        
        // Agregar el nuevo día al objeto routineObj
        setRoutineObj(prevState => ({
            ...prevState,
            userId,
            days: [...prevState.days, dayObj]
        }));
        
        // Actualizar el routineDisplay para mostrar los días y ejercicios seleccionados
        setRoutineDisplay(prevState => [
            ...prevState,
            {
                day: dayValue,
                exercises: exercisesId.map(exerciseId => {
                    const exercise = exercises.find(ex => ex.id === exerciseId);
                    return exercise ? exercise.nombre : "Ejercicio no encontrado";
                }),
                details: routineDetail
            }
        ]);
    
        // Reiniciar valores
        setDayValue("");
        setExercisesId([]);
        setDetailValue({});
        setRoutineDetail([]);
        setDisable(null);
        setCurrentExercise(null);
    };
    

    const handleSaveRoutine = async (routineObj) => {

        try {
            const newRoutine = await postRoutine(routineObj);
            console.log(newRoutine.successMessage);

         
            
        } catch (error) {
            console.log(error);
            
           

        }


    };

    const handleDayChange = (event) => {
        setDayValue(event.target.value);
    };

    const handleUserId = (event) => {
        setUserId(event.target.value);
    };

    const handleExerciseSelection = (event) => {
        const exerciseId = parseInt(event.target.value, 10);
        setCurrentExercise(exerciseId);
        if (!exercisesId.includes(exerciseId)) {
            setExercisesId(prevState => [...prevState, exerciseId]);
        }
        setDisable(exerciseId);
    };

    const handleDetail = (event, exerciseId) => {
        const { value } = event.target;
        setDetailValue(prevState => ({
            ...prevState,
            [exerciseId]: { id: exerciseId, setsAndReps: value, weights: { week1: "", week2: "", week3: "", week4: "" } }
        }));
    };

    const filterValues = (exercises = []) => {
        const musclesGroupSet = new Set();
        exercises.forEach(exercise => {
            musclesGroupSet.add(exercise.grupo_muscular);
        });
        return [...musclesGroupSet];
    };

    const handleSelectChange = (filterOption) => {
        const filter = exercises.filter(exercise => exercise.grupo_muscular === filterOption);
        setFilteredExercises(filter);
    };

    const handleRemove = (exerciseIdToRemove) => {
        setExercisesId(prevState => prevState.filter(exerciseId => exerciseId !== exerciseIdToRemove));
        setRoutineDetail(prevState => prevState.filter(detail => detail.id !== exerciseIdToRemove));
        setDetailValue(prevState => {
            const cleanedDetail = { ...prevState };
            delete cleanedDetail[exerciseIdToRemove];
            return cleanedDetail;
        });
    };

    return (
        <MainContainer>
            
                <CustomTypography variant="h3" align="center">Crear rutina</CustomTypography>
            

            <ContentContainer>
            <CreateRutineContainer>
            <HeaderContainer>
                
                <Idcontainer>
                    <TextField
                        label="Dni usuario"
                        variant="outlined"
                        value={userId || ""}
                        onChange={handleUserId}
                        name="Dni usuario"
                        sx={{ ...textFieldStyles }}
                        InputLabelProps={{
                            style: { color: 'black' }
                        }}
                    />
                    <TextField
                        select
                        label="Dia de entrenamiento"
                        variant="outlined"
                        value={dayValue || ""}
                        onChange={handleDayChange}
                        sx={{
                            ...textFieldStyles,
                            '& .MuiSelect-select': {
                                color: 'black', // Color de la opción seleccionada
                            }
                        }}
                        InputLabelProps={{
                            style: { color: 'black' }
                        }}
                    >
                        <MenuItem value="" sx={{ color: 'black' }}>Dias de entrenamiento</MenuItem>
                        <MenuItem value="1" sx={{ color: 'black' }}>Dia 1</MenuItem>
                        <MenuItem value="2" sx={{ color: 'black' }}>Dia 2</MenuItem>
                        <MenuItem value="3" sx={{ color: 'black' }}>Dia 3</MenuItem>
                        <MenuItem value="4" sx={{ color: 'black' }}>Dia 4</MenuItem>
                        <MenuItem value="5" sx={{ color: 'black' }}>Dia 5</MenuItem>
                        <MenuItem value="6" sx={{ color: 'black' }}>Dia 6</MenuItem>
                    </TextField>
                </Idcontainer>
            </HeaderContainer>
            <ExercisesContainer>
                <Box sx={{display:'flex',flexDirection:'column',gap:'15px'}}>
                    <RoutineNavBarContainer>
                        <RoutineNavBar filterValues={filterValues(exercises)} handleSelectChange={handleSelectChange} />

                    </RoutineNavBarContainer>
                    <MobileExerciseSelector
                        exercises={filteredExercises.length > 0 ? filteredExercises : exercises}
                        handleExerciseSelection={handleExerciseSelection}
                    />
                    {currentExercise !== null && (
                        <Box>
                            <Typography sx={{ color: 'white' }}>series y reps</Typography>
                            <TextField
                                key={currentExercise}
                                sx={{
                                    ...textFieldStyles,
                                    '& .MuiInputBase-input': {
                                        color: 'black',  // Color del texto escrito
                                    }
                                }}
                                disabled={disable !== currentExercise}
                                value={detailValue[currentExercise]?.setsAndReps || ''}
                                onChange={(event) => handleDetail(event, currentExercise)}
                                placeholder={`Ejercicio ${currentExercise}`}
                                InputLabelProps={{
                                    style: { color: 'black' }
                                }}
                            />
                        </Box>
                    )}
                </Box>
                <RoutineDisplay
                    dayValue={dayValue}
                    exercisesId={exercisesId}
                    exercises={exercises}
                    routineDetail={routineDetail}
                    handleRemove={handleRemove}
                    handleAddDay={handleAddDay}
                />

            </ExercisesContainer>
            <Button
                onClick={() => handleSaveRoutine(routineObj)}
                sx={{
                    background: 'linear-gradient(45deg, #C004FF, #730399)',
                    color: 'white',
                    width: '100%',
                    height: '60px',
                    marginTop: '10px',
                    '&:hover': {
                        backgroundColor: '#0028ff' // mantener el color azul en hover
                    }
                }}
            >
                GRABAR RUTINA
            </Button>
            </CreateRutineContainer>
            <DisplayRoutineContainer>
          {routineDisplay.map((day, dayIndex) => (
            <div key={dayIndex}>
              

              {/* Tabla con Ejercicios y Sets y Reps usando Material-UI */}
              <TableContainer component={Paper} sx={{
                width:'100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo más oscuro con opacidad
                backdropFilter: 'blur(10px)', // Efecto esmerilado
                borderRadius: '5px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom:'15px'
                }}>
              <Typography sx={{fontFamily:'Nunito', textAlign:'center', marginTop:'10px', fontSize:'20px',fontWeight:'600',color:'white'}}>Día {day.day}</Typography>
                <Table  sx={{   width: "100%" , boxSizing:'border-box',padding:'50px'}}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{width:'50%',fontWeight:'600',fontFamily:'Nunito',fontSize:'20px',  borderBottom: '2px solid white', color:'white' }}>Ejercicio</TableCell>
                      <TableCell sx={{width:'50%',textAlign:'center', fontWeight:'600',fontFamily:'Nunito',fontSize:'20px', borderBottom: '2px solid white',color:'white' }}>Sets y Reps</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {day.exercises.map((exercise, i) => (
                      <TableRow key={i}>
                        <TableCell sx={{fontWeight:'bold',fontFamily:'Nunito', borderBottom: '1px solid white',color:'white' }}>{exercise}</TableCell>
                        <TableCell sx={{textAlign:'center',fontWeight:'bold',fontFamily:'Nunito', borderBottom: '1px solid white',color:'white' }}>{day.details[i]?.setsAndReps || "No definido"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          ))}
        </DisplayRoutineContainer>
           
            </ContentContainer>
            
           
        </MainContainer>
    );
};

export default CreateRoutine;



const MainContainer = styled(Box)(({ theme }) => ({
    width: '100vw',
    height: '100vh',  // Usa '100vh' para ocupar toda la altura de la ventana
    padding: '15px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',  // Asegura que el contenido no se desborde del contenedor
    backgroundColor:'white',
  
    [theme.breakpoints.up('md')]: {
      width: 'calc(100vw - 240px)',
      marginLeft: '240px',
      padding: '15px',
      justifyContent: 'space-around',
    },
  }));
  

const HeaderContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    //gap:'15px'
}));

const Idcontainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display:'flex',
    flexDirection:'column',
    gap:'15px'
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    // gap: '20px',
    //marginTop: '20px'
}));

const ExercisesContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap:'15px',
 
    //padding: '10px'
}));

const RoutineNavBarContainer = styled(Box)(({ theme }) => ({
   // marginBottom: '20px'
}));

const textFieldStyles = {
    width: '100%',
   backgroundColor: 'white',
   borderRadius: '5px',
    '& .MuiInputBase-input': {
        color: 'white'
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

// const textFieldDetailStyles = {
//     width: '100%',
//     backgroundColor: 'white',
//     '& .MuiInputBase-input': {
//         color: 'white'
//     },
//     '& .MuiOutlinedInput-root': {
//         '& fieldset': {
//             borderColor: 'black',
//         },
//         '&:hover fieldset': {
//             borderColor: 'black',
//         },
//         '&.Mui-focused fieldset': {
//             borderColor: 'black',
//         },
//     },
//     '& .MuiInputLabel-root': {
//         color: 'white',
//     }
// };

const CustomTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "Nunito",
    fontWeight: '600',
    fontSize: '45px',
    color: 'black',
    marginTop: '50px',
    marginBottom:'30px',
    fontWeight: 'bold',
}));

const CreateRutineContainer = styled(Box)(({ theme }) => ({
    width: '100%', 
    height: '100%',
    maxHeight:'100vh',
    padding: '15px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap:'15px',
    backgroundColor: 'transparent',
   
    
    [theme.breakpoints.up('md')]: {
      width:'45%',
      height:'100%',
      //border:'1px solid black',
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'center',
      gap:'15px',
      margin:'0'
     

      
     
    },

    [theme.breakpoints.down('md')]: {
       
       
        backgroundImage: `url(${createRoutineImage})`,
        backgroundSize: 'cover',  // Asegura que la imagen cubra toda el área
        backgroundRepeat: 'no-repeat',  // Evita que la imagen se repita
        backgroundPosition: 'center',  // Centra la imagen
        
       
      },
  }));

  const DisplayRoutineContainer = styled(Box)(({ theme }) => ({
    width:'100%',
    display:'none',
    
    [theme.breakpoints.up('md')]: {
      width:'45%',
      height:'100%',
     // border: '1px solid black',
      boxSizing:'border-box',
      padding:'15px',
      display:'flex',
      flexDirection:'column',
      overflowY: 'auto'
      
      
     
    },
  }));

  const ContentContainer = styled(Box)(({ theme }) => ({
        width:'100%',
        height:'calc(100vh - 56px)',
    
    [theme.breakpoints.up('md')]: {
      width:'100%',
      height:'100%',
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      border: '1px solid black',
      boxSizing:'border-box',
      backgroundImage: `url(${createRoutineImage})`,
      backgroundSize: 'cover',  // Asegura que la imagen cubra toda el área
      backgroundRepeat: 'no-repeat',  // Evita que la imagen se repita
      backgroundPosition: 'center',  // Centra la imagen
      
     
    },
  }));


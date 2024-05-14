import React, {useState,useEffect} from "react";
import { Box, Drawer, Typography, ListItem, Button, Menu, MenuItem, ListItemIcon, ListItemText, TextField, Alert , Snackbar, SnackbarContent} from "@mui/material";
import { useExercisesStore } from "../../../store/useExercisesStore";
import {useRoutinesStore} from "../../../store/useRoutinesStore";
import { typography } from "@mui/system";
import RoutineNavBar from '../../../../src/Components/routineNavBar/RoutineNavBar';



const CreateRoutine = () => {
    const {exercises , fetchExercises} = useExercisesStore();
    const {succesMessage , errorMessage, emptyMessages} = useRoutinesStore();
    const {postRoutine} = useRoutinesStore();
    const [routineObj , setRoutineObj] = useState({
        userId: "",
        days: []
    });
    const [dayValue , setDayValue] = useState("");
    const [exercisesId , setExercisesId] = useState([]);
    const [userId , setUserId] =useState("");
    const [filteredExercises ,  setFilteredExercises] = useState([]);
    const [detailValue , setDetailValue] = useState([]);
    const [routineDetail , setRoutineDetail] = useState([]);
    const [disable , setDisable] = useState(null)
    const [message , setMessage] = useState("");
    const [severity , setSeverity] = useState("");
    const [alerSucces , setAlertSuccsess] = useState("")
    const [alerError , setAlertError] = useState("")
   
    console.log('obj que se envia al back',routineObj);
    console.log('mensaje de exito',succesMessage);
    console.log('mensaje de error',errorMessage);
    console.log(message);

    useEffect(()=>{
        fetchExercises();

        setRoutineDetail(Object.values(detailValue))

        handleMessage();
      
    },[detailValue,succesMessage,errorMessage])

    const handleMessage = () => {
        if(succesMessage){
            //setAlertSuccsess(succesMessage)
            setMessage(succesMessage);
            setSeverity('success');
        }

        if(errorMessage){
            //setAlertError(errorMessage)
            setMessage(errorMessage);
            setSeverity('error');
        }


    };

    const handleCloseAlert = () => {
        setMessage("");
        emptyMessages();
        
    }
    const handleAddDay = () => {

        const dayObj = {
            dayId: dayValue,
            exercisesId: exercisesId,
            routineDetail: routineDetail
        };
        setRoutineObj(prevState =>({
            ...prevState,
            userId:userId,
            days:[...prevState.days,dayObj]
        }))
      
        setDayValue("");
        setExercisesId([]);
        setDetailValue([]);
        setRoutineDetail([]);
        setDisable(null);

    };

    const handleSaveRoutine = (routineObj) => {
        postRoutine(routineObj);
        setRoutineObj({
            userId: "",
            days: []
        });

        setUserId("")
        
    };

    const handleDayChange = (event) => {

        setDayValue(event.target.value)
    };

    const handleUserId = (event) => {

        setUserId(event.target.value);

    };

    const handleExerciseSelection = (event,exercise) => {

        const exerciseId = parseInt(event.currentTarget.getAttribute("data-id"), 10);
        if(!exercisesId.includes(exerciseId)){
            setExercisesId(prevState => [...prevState, exerciseId]);

        }
        setDisable(exerciseId)
        
        
    };

    const handleDetail = (event, exerciseId) => {
        console.log("se activo la funcion",event.target.value);
        const {value}  = event.target;
        console.log(value);
        setDetailValue(prevState => ({
            ...prevState,
            [exerciseId]: { id: exerciseId,setsAndReps: value }
        }));
    };

   
    const filterValues = (exercises) => {

        const musclesGroupSet = new Set();

        exercises.forEach(exercise => {
           musclesGroupSet.add(exercise.grupo_muscular); 
        });

        const filterOptions = [...musclesGroupSet];

        return filterOptions;

    };

    const handleSelectChange = (filterOption,exercises) => {
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

    return(
        <>
            <Box sx={{width:'calc(100vw - 280px)', height:'30vh', border:'solid 1px black'}}>
                <Typography variant="h3" align="center">CREAR RUTINA</Typography>
                <Box sx={{display:'flex', flexDirection:'column', gap:'1em'}}>
                    <TextField
                    label="Dni usuario"
                    variant="outlined"
                    value={userId}
                    onChange={handleUserId}
                    name="Dni usuario"
                    
                    sx={{
                        width: '15%', // Establece el ancho al 100% del contenedor
                        '& .MuiOutlinedInput-root': { // Aplica estilos al componente de entrada subyacente
                          borderRadius: '8px', // Cambia el radio de los bordes
                          backgroundColor: '#f0f0f0', // Cambia el color de fondo
                          '& fieldset': { // Establece estilos para el borde del campo
                            borderColor: '#aaa', // Cambia el color del borde
                          },
                          '&:hover fieldset': { // Establece estilos al pasar el mouse sobre el campo
                            borderColor: '#555', // Cambia el color del borde al pasar el mouse
                          },
                        },
                      }}
                    />
                    <TextField
                    select
                    label="Dia de entrenamiento"
                    variant="outlined"
                    value={dayValue}
                    onChange={handleDayChange}
                    sx={{
                        width: '15%', 
                        '& .MuiOutlinedInput-root': { 
                          borderRadius: '8px', 
                          backgroundColor: '#f0f0f0', 
                          '& fieldset': { 
                            borderColor: '#aaa', 
                          },
                          '&:hover fieldset': { 
                            borderColor: '#555', 
                          },
                        },
                    }}
                    >
                        <MenuItem value=" ">Dias de entrenamiento</MenuItem>
                        <MenuItem value="1">Dia 1</MenuItem>
                        <MenuItem value="2">Dia 2</MenuItem>
                        <MenuItem value="3">Dia 3</MenuItem>
                        <MenuItem value="4">Dia 4</MenuItem>
                        <MenuItem value="5">Dia 5</MenuItem>
                        <MenuItem value="6">Dia 6</MenuItem>
                    </TextField>  
                </Box>
            </Box>
            <Box sx={{width:'calc(100vw - 240px)', display:'flex',justifyContent:'center',gap:'2em'}}>
                <Box>
                    <Box sx={{width:'45vw', height:'8vh'}}>
                      <RoutineNavBar filterValues={filterValues} handleSelectChange={handleSelectChange}/>
                    </Box>
                    <Box sx={{width:'45vw',height:'70vh',border:'solid 1px black', display:'flex', flexDirection:'row', gap:'5px'}}>
                    <Box sx={{width:'50%'}}>
                        <Typography textAlign="center">renderizado de ejercicios</Typography>
                        {filteredExercises.length > 0 ? (
                            filteredExercises.map(exercise => (
                                <Typography
                                    key={exercise.id}
                                    align="left"
                                    component="button"
                                    variant="h9"
                                    onClick={handleExerciseSelection}
                                    sx={{width:'100%'}}
                                    data-id={exercise.id}
                                >
                                    {exercise.nombre}
                                </Typography>
                            ))
                        ) : (
                            exercises.map(exercise => (
                                <Typography
                                    key={exercise.id}
                                    align="left"
                                    component="button"
                                    variant="h9"
                                    onClick={handleExerciseSelection}
                                    sx={{width:'100%'}}
                                    data-id={exercise.id}
                                    
                                >
                                    {exercise.nombre}
                                </Typography>
                            ))
                        )}
                    </Box>
                        <Box
                            sx={{width:'50%'}}>
                            
                            <Typography textAlign="center">series y reps</Typography>
                            {filteredExercises.length > 0 ? (
                                filteredExercises.map(exercise => (
                                    <TextField
                                        key={exercise.id}
                                        sx={{
                                            width: '100%',
                                            height: '27px',
                                            '& .MuiInputBase-root': {
                                                height: '1.7rem',
                                                lineHeight: '1.7rem',
                                            },
                                            '& input': {
                                                cursor: 'text',
                                                height: '1.7rem',
                                            },
                                        }}
                                        disabled={disable !== exercise.id}
                                        value={detailValue[exercise.id]?.setsAndReps || ''}
                                        onChange={(event) => handleDetail(event, exercise.id)} 
                                    />
                                ))
                            ) : (
                                exercises.map(exercise => (
                                    <TextField
                                        key={exercise.id}
                                        sx={{
                                            width: '100%',
                                            height: '27px',
                                            '& .MuiInputBase-root': {
                                                height: '1.7rem',
                                                lineHeight: '1.7rem',
                                            },
                                            '& input': {
                                                cursor: 'text',
                                                height: '1.7rem',
                                            },
                                        }}
                                        disabled={disable !== exercise.id}
                                        value={detailValue[exercise.id]?.setsAndReps || ''}
                                        onChange={(event) => handleDetail(event, exercise.id)} 
                                    />
                                ))
                            )}
                                                    

                        </Box>
                        
                    </Box>
                    
                </Box>
                
                <Box sx={{width:'40vw',height:'70vh',border:'solid 1px black'}}>
                    <Typography>renderizado de rutina</Typography>
                        {dayValue ? (
                            <Typography>{`Dia ${dayValue}`}</Typography>
                        ):null}
                    {exercisesId.length > 0 && (
                             <div>
                                <Typography variant="h5">{`Dia ${dayValue}`}</Typography>
                                {exercisesId.map((exerciseId, index) => (
                                    <Box key={index} sx={{border:'solid 1px black',margin:'1em', display:'flex', gap:'2em'}}>
                                        {/* Encuentra el nombre del ejercicio basado en el exerciseId */}
                                        <Typography>{exercises.find(exercise => exercise.id === exerciseId)?.nombre}</Typography>
                                        {/* Encuentra el detalle correspondiente y muestra setsAndReps */}
                                       { <Typography>{routineDetail.find(detail => detail.id === exerciseId)?.setsAndReps}</Typography>}
                                       <Button onClick={() => handleRemove(exerciseId)}>QUITAR</Button>
                                    </Box>
                                ))}
                            </div>
                        )}
                        <Button
                        onClick={handleAddDay}
                        >AGREGAR A RUTINA</Button>      
                </Box>
            </Box>
            <Button onClick={()=>{handleSaveRoutine(routineObj)}}>GRABAR RUTINA</Button>
            {
                message && (
                    <Snackbar open={!!message} autoHideDuration={3000} onClose={handleCloseAlert}>
                        <Alert severity={severity} variant="filled">{message}</Alert>
                    </Snackbar>
                )
            }
        </>
        
    )
};


export default CreateRoutine;
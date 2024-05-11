import React, {useState,useEffect} from "react";
import { Box, Drawer, Typography, ListItem, Button, Menu, MenuItem, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { useExercisesStore } from "../../../store/useExercisesStore";
import {useRoutinesStore} from "../../../store/useRoutinesStore";
import { typography } from "@mui/system";
import RoutineNavBar from '../../../../src/Components/routineNavBar/RoutineNavBar';



const CreateRoutine = () => {
    const {exercises , fetchExercises} = useExercisesStore();
    const {postRoutine} = useRoutinesStore();
    const [routineObj , setRoutineObj] = useState({
        userId: "",
        days: []
    });
    const [dayValue , setDayValue] = useState("");
    const [exercisesId , setExercisesId] = useState([]);
    const [userId , setUserId] =useState("");
    const [filteredExercises ,  setFilteredExercises] = useState([]);
   

  
    console.log(filteredExercises);
    console.log(exercises);
 

    useEffect(()=>{
        fetchExercises();
      
    },[])

    
    const handleAddDay = () => {

        const dayObj = {
            dayId: dayValue,
            exercisesId: exercisesId
        };
        setRoutineObj(prevState =>({
            ...prevState,
            userId:userId,
            days:[...prevState.days,dayObj]
        }))
        console.log(dayObj);

        setDayValue("");
        setExercisesId([]);

    };

    const handleSaveRoutine = (routineObj) => {
        postRoutine(routineObj);
    };

    const handleDayChange = (event) => {

        setDayValue(event.target.value)
    };

    const handleUserId = (event) => {

        setUserId(event.target.value);

    };

    const handleExerciseSelection = (event) => {

        const exerciseId = parseInt(event.currentTarget.getAttribute("data-id"), 10);
        if(!exercisesId.includes(exerciseId)){
            setExercisesId(prevState => [...prevState, exerciseId]);

        }
        
        
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
                                    <Typography key={index} component="div">
                                        {/* Encuentra el nombre del ejercicio basado en el exerciseId */}
                                        {exercises.find(exercise => exercise.id === exerciseId)?.nombre}
                                        {console.log(exercises.find(exercise => exercise.id === exerciseId))}
                                    </Typography>
                                ))}
                            </div>
                        )}
                        <Button
                        onClick={handleAddDay}
                        >AGREGAR A RUTINA</Button>      
                </Box>
            </Box>
            <Button onClick={()=>{handleSaveRoutine(routineObj)}}>GRABAR RUTINA</Button>
        </>
        
    )
};


export default CreateRoutine;
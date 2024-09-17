import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, MenuItem, Button, Alert, Snackbar, styled } from "@mui/material";
import { useExercisesStore } from "../../../store/useExercisesStore";
import { useRoutinesStore } from "../../../store/useRoutinesStore";
import RoutineNavBar from '../../../../src/Components/routineNavBar/RoutineNavBar';
import MobileExerciseSelector from "../../../Components/MobileExerciseSelector";
import RoutineDisplay from "../../../Components/RoutineDisplay";
import UserNavBar from "../../../Components/UserNavBar";
import Swal from 'sweetalert2';



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

    console.log(routineObj);
    console.log('error',errorMessage);
    console.log(succesMessage);
    
    

    useEffect(() => {
        fetchExercises();
        setRoutineDetail(Object.values(detailValue));
        //handleMessage();
    }, [detailValue]);

    useEffect(() => {
        // Observar cambios en los mensajes de éxito o error
        if (succesMessage) {
          Swal.fire({
            icon: "success",
            title: "Excelente!",
            text: succesMessage,
            showConfirmButton: true,
          });
          // Limpiar mensajes después de mostrar alerta
          emptyMessages();
        }
    
        if (errorMessage) {
          Swal.fire({
            icon: "error",
            title: "Upss!",
            text: errorMessage,
            showConfirmButton: true,
          });
          // Limpiar mensajes después de mostrar alerta
          emptyMessages();
        }
      }, [succesMessage, errorMessage, emptyMessages]);

    // const handleMessage = () => {
    //     if (succesMessage) {
    //         setMessage(succesMessage);
    //         console.log(message);
            
            
    //     }

    //     if (errorMessage) {
    //         setMessage(errorMessage);
    //         console.log(message);
    //     }
    // };

    // const handleCloseAlert = () => {
    //     setMessage("");
    //     emptyMessages();
    // };

    const handleAddDay = () => {
        const dayObj = { dayId: dayValue, exercisesId, routineDetail };
        setRoutineObj(prevState => ({
            ...prevState,
            userId,
            days: [...prevState.days, dayObj]
        }));
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
            <HeaderContainer>
                <CustomTypography variant="h3" align="center">CREAR RUTINA</CustomTypography>
                <Idcontainer>
                    <TextField
                        label="Dni usuario"
                        variant="outlined"
                        value={userId || ""}
                        onChange={handleUserId}
                        name="Dni usuario"
                        sx={{ ...textFieldStyles }}
                        InputLabelProps={{
                            style: { color: 'white' }
                        }}
                    />
                    <TextField
                        select
                        label="Dia de entrenamiento"
                        variant="outlined"
                        value={dayValue || ""}
                        onChange={handleDayChange}
                        sx={{ ...textFieldStyles }}
                        InputLabelProps={{
                            style: { color: 'white' }
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
                <Box>
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
                                sx={{ ...textFieldDetailStyles }}
                                disabled={disable !== currentExercise}
                                value={detailValue[currentExercise]?.setsAndReps || ''}
                                onChange={(event) => handleDetail(event, currentExercise)}
                                placeholder={`Ejercicio ${currentExercise}`}
                                InputLabelProps={{
                                    style: { color: 'white' }
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
                    backgroundColor: '#0028ff',
                    color: 'white',
                    width: '100%',
                    height: '60px',
                    marginTop: '50px',
                    '&:hover': {
                        backgroundColor: '#0028ff' // mantener el color azul en hover
                    }
                }}
            >
                GRABAR RUTINA
            </Button>

        </MainContainer>
    );
};

export default CreateRoutine;

const MainContainer = styled(Box)(({ theme }) => ({
    width: '100vw',
    height: 'auto',
    padding: '15px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',

}));

const HeaderContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}));

const Idcontainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    marginTop: '40px'
}));

const ExercisesContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px'
}));

const RoutineNavBarContainer = styled(Box)(({ theme }) => ({
    marginBottom: '20px'
}));

const textFieldStyles = {
    width: '100%',
    marginBottom: '20px',
    '& .MuiInputBase-input': {
        color: 'white'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'blue',
        },
        '&:hover fieldset': {
            borderColor: 'blue',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'blue',
        },
    },
    '& .MuiInputLabel-root': {
        color: 'white',
    }
};

const textFieldDetailStyles = {
    width: '100%',
    marginBottom: '10px',
    '& .MuiInputBase-input': {
        color: 'white'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'blue',
        },
        '&:hover fieldset': {
            borderColor: 'blue',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'blue',
        },
    },
    '& .MuiInputLabel-root': {
        color: 'white',
    }
};

const CustomTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "Bebas Neue",
    fontWeight: '400',
    fontSize: '3em',
    color: 'white',
    marginTop: '100px'
}));

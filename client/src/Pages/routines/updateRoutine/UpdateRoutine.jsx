import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, styled, IconButton } from "@mui/material";
import { useUsersStore } from "../../../store/useUsersStore";
import { useRoutinesStore } from '../../../store/useRoutinesStore';
import { useExercisesStore } from "../../../store/useExercisesStore";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Tooltip } from '@nextui-org/react';
import MobileExerciseSelector from "../../../Components/MobileExerciseSelector";
import RoutineNavBar from "../../../Components/routineNavBar/RoutineNavBar";
import UserNavBar from "../../../Components/UserNavBar";
import Loader from "../../../Components/loader/Loader";
import Swal from 'sweetalert2';
import { boxSizing, color, height, maxHeight, minHeight, width } from "@mui/system";
import picture1 from '../../../../src/assests/imagenes/editRoutineLeft.png';
import picture2 from '../../../../src/assests/imagenes/editRoutineRitght.png';
import Cookies from 'js-cookie';  // Importa js-cookie
import {jwtDecode} from 'jwt-decode';  // Importa jwt-decode

const UpdateRoutine = () => {
    const { exercises, fetchExercises } = useExercisesStore();
    const { getUserById, searchedUser, clearSearchedUser } = useUsersStore();
    const { masterUpdateRoutine, removeExercise, addingNewExercise, creatingNewDay, deleteDay } = useRoutinesStore();
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState(null);
    const [editingIndices, setEditingIndices] = useState({ dayIndex: null, exerciseIndex: null });
    const [setsAndReps, setSetsAndReps] = useState("");
    const [isAddingDayId, setIsAddingDayId] = useState(null);
    const [addExercise, setAddExercise] = useState({
        dayId: "",
        exerciseId: "",
        routineDetail: {}
    })
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [exercisesId, setExercisesId] = useState([]);
    const [currentExercise, setCurrentExercise] = useState(null);
    const [disable, setDisable] = useState(null);
    const [detailValue, setDetailValue] = useState({});
    const [day, setday] = useState(null);
    const [newDetail, setnewdetail] = useState({})
    const [isAddingDays, setIsAddingDays] = useState(false);
    const [dayToAdd, setDayToAdd] = useState({ day: "" });
    const [dayToRemove, setDayToRemove] = useState({ day: null });
    const [loading, setLoading] = useState(false);
    const [TenantId, setTenantId] = useState('');

    console.log('desde updateroutine',TenantId);
    console.log(user);
    
    

     useEffect(() => {
             
              const token = Cookies.get('token');  
            
              
      
              if (token) {
                  try {
                      // Decodificar el token usando jwt-decode
                      const decodedToken = jwtDecode(token);
                     
                      
                      
                      // Extraer el tenantId (asegúrate de que 'tenantId' esté en el token)
                      const tenantIdFromToken = decodedToken.TenantId;
                      console.log('tenantIdFromToken',tenantIdFromToken);
                      
                      
                      // Guardar tenantId en el estado
                      setTenantId(tenantIdFromToken);
                  } catch (error) {
                      console.error('Error decodificando el token:', error);
                  }
              } else {
                  console.warn('Token no encontrado en la cookie.');
              }
          }, []);

  //  console.log(dayToRemove);
  //  console.log(isAddingDays);

    const handleDetail = (event, exerciseId) => {
        const { value } = event.target;
        setDetailValue(prevState => ({
            ...prevState,
            [exerciseId]: { id: exerciseId, setsAndReps: value, weights: { week1: "", week2: "", week3: "", week4: "" } }
        }));
    };


    const showStoreState = () => {
        const state = useUsersStore.getState();
       // console.log('Estado completo del store:', state);
       // console.log('searchedUser:', state.searchedUser);
    };

    showStoreState();


    const handleUserId = (event) => {
        const id = event.target.value;
        setUserId(id);
    };

    useEffect(() => {

        if(TenantId){
            setUser(searchedUser);
            fetchExercises(TenantId);
        }

       

    }, [searchedUser, addExercise, getUserById,TenantId]);

    useEffect(() => {
        if (day && currentExercise && detailValue[currentExercise]) {
            const correctDetail = detailValue[currentExercise];
            setAddExercise({
                dayId: day,
                exerciseId: currentExercise,
                routineDetail: correctDetail
            });
            setnewdetail(correctDetail);
        }
    }, [day, currentExercise, detailValue]);


    const handleSearch = async () => {
        if (userId.trim()) {
            setLoading(true);
            try {
                await getUserById(userId,TenantId);
                
                // Simular un retraso de 2 segundos antes de ocultar el loader
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            } catch (error) {
                console.error("Error fetching user:", error);
                setLoading(false); // Asegúrate de ocultar el loader en caso de error
            }
        } else {
            console.error("Please enter a valid user ID");
        }
    };

    const handleEdit = (dayIndex, exerciseIndex, exerciseId) => {
        setIsAddingDayId(null)
        setEditingIndices({ dayIndex, exerciseIndex });
        const routineDetail = user.routine.routineDetail.find(detail => detail.id === exerciseId) || {};
        setSetsAndReps(routineDetail.setsAndReps || "");
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        setSetsAndReps(value);
    };

    const handleSave = async (exerciseId) => {
        console.log('Guardar cambios:', setsAndReps);
        const id = user.routine.id;

        const updatedData = {
            exerciseId: exerciseId,
            setsAndReps: setsAndReps
        };

        try {
            const modifyRoutine = await masterUpdateRoutine(id, updatedData);
            await getUserById(userId,TenantId);
            setEditingIndices({ dayIndex: null, exerciseIndex: null });
            if(modifyRoutine){
                Swal.fire({
                    icon: 'success',
                    title: 'Excelente!',
                    text: 'La rutina se modificó exitosamente.',
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
        } catch (error) {
            console.error("Error updating routine:", error);
        }
    };

    const handleSaveNewExercise = async (routineId, addExercise) => {
        if (!addExercise.dayId || !addExercise.exerciseId || !Object.keys(newDetail).length) {
            console.error("Faltan datos para añadir un nuevo ejercicio.");
            return;
        }

        try {
            const exerciseToAdd = {
                ...addExercise,
                routineDetail: newDetail
            };

            const newExercise =await addingNewExercise(routineId, exerciseToAdd);
            setIsAddingDayId(null);
            await getUserById(userId,TenantId);
            if(newExercise){
                Swal.fire({
                    icon: 'success',
                    title: 'Excelente!',
                    text: 'La rutina se modificó exitosamente.',
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
        } catch (error) {
            console.error("Error al añadir el nuevo ejercicio:", error);
        }
    };

    const handleCancel = () => {
        setEditingIndices({ dayIndex: null, exerciseIndex: null });
    };

    const handleDelete = async (exerciseId,dayId) => {
        try {
            console.log('desde handledelete', user);

            await removeExercise(user.routine.id, exerciseId,dayId);
            console.log('a ver si llega aca?');


            setUser(prevUser => {

                const updatedDays = prevUser.routine.DayOfWeeks.map(day => ({
                    ...day,
                    Exercises: day.Exercises.filter(exercise => exercise.id !== exerciseId)
                }));
                return {
                    ...prevUser,
                    routine: {
                        ...prevUser.routine,
                        DayOfWeeks: updatedDays
                    }
                };
            });
            console.log('dlete/2');

            await getUserById(userId,TenantId);
        } catch (error) {
            console.error('Error en handleDelete:', error);
        }
    };

    useEffect(() => {
        if (day && currentExercise && detailValue[currentExercise]) {
            setAddExercise({
                dayId: day,
                exerciseId: currentExercise,
                routineDetail: detailValue
            });
        }
    }, [day, currentExercise, detailValue]);

    const handleAddExercise = (dayId) => {
        setIsAddingDayId(dayId);
        setEditingIndices({ dayIndex: null, exerciseIndex: null });
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

    const handleExerciseSelection = (event) => {
        const exerciseId = parseInt(event.target.value, 10);
        setCurrentExercise(exerciseId);
        if (!exercisesId.includes(exerciseId)) {
            setExercisesId(prevState => [...prevState, exerciseId]);
        }
        setDisable(exerciseId);
    };

    const handleDay = (day) => {
        setday(day);
    };

    const handleCancelAddExercise = () => {
        setIsAddingDayId(null);
        setCurrentExercise(null);
        setDetailValue({});
    };




    useEffect(() => {
        return () => {
            clearSearchedUser(); // Limpiar el estado global al desmontar el componente
        };
    }, [clearSearchedUser]);

    const handleIsAddingDays = () => {
        setIsAddingDays(true);
    };

    const handleNewDay = (event) => {
        const dayId = event.target.value;
        setDayToAdd(prevState => (
            { ...prevState, day: dayId }
        ));
    }

    const confirmAddDay = async (routineId, dayToAdd) => {
        console.log(routineId);
        console.log(dayToAdd.day);

        const response = await creatingNewDay(routineId, dayToAdd)
        console.log(response);

        setIsAddingDays(false);
        getUserById(userId,TenantId);
        setDayToAdd(prevState => (
            { ...prevState, day: "" }
        ));
    };


    const handleDeleteDay = async (routineId, dayId) => {
        try {
            setDayToRemove({ day: dayId });

            await deleteDay(routineId, { day: dayId });


            await getUserById(userId,TenantId);
        } catch (error) {
            console.error('Error al eliminar el día:', error);
        }
    };

    const handleCancelAddDay = () => {
        setIsAddingDays(false)
        // getUserById(userId)
    };

    return (
        <MainContainer>
            
           
            <ContentContainer>
                <PictureleftContainer></PictureleftContainer>
                <MainContentContainer>
                <CustomTitle>Editar rutina</CustomTitle>
                <SearchBox>
                <TextField
                    label="Dni usuario"
                    variant="outlined"
                    value={userId || ""}
                    onChange={handleUserId}
                    name="Dni usuario"
                    sx={{ ...textFieldStyles, width: '50%' }}
                    InputLabelProps={{ style: { color: 'black' } }}
                />
                <Button
                    onClick={handleSearch}
                    sx={{
                        background: 'linear-gradient(45deg, #C004FF, #730399)',
                        color: 'white',
                        width: '30%',
                        height: '55px',
                        '&:hover': { backgroundColor: '#0028ff' }
                    }}
                >
                    BUSCAR
                </Button>
            </SearchBox>
            {loading ? (
                <Loader />
            ) : (
                user && user.routine ? (
                    <UserContainer>
                        <CustomTypography sx={{ marginBottom: '25px' }}>{user.user.nombre}</CustomTypography>
                        <Button
                            sx={{  background: 'linear-gradient(45deg, #C004FF, #730399)', color: 'white', marginBottom: '30px', width:'100%' }}
                            onClick={handleIsAddingDays}
                        >
                            AGREGAR DIA
                        </Button>
                        {isAddingDays === true ? (
                            <AddnewDayContainer>
                                <CustomTypography sx={{ color: 'black',marginBottom:'10px', fontWeight:'500' }}>Dia a agregar</CustomTypography>
                                <TextField
                                    label="Dia a agregar"
                                    variant="outlined"
                                    value={dayToAdd.day || ""}
                                    onChange={handleNewDay}
                                    name="Dia a agregar"
                                    sx={{ ...textFieldStyles, width: '100%'}}
                                    InputLabelProps={{ style: { color: 'black',textAlign:'center' } }}
                                    inputProps={{ style: { textAlign: 'center' } }}
                                />
                                <Button
                                    sx={{ background: 'linear-gradient(45deg, #C004FF, #730399)', color: 'white', marginTop: '10px', marginBottom: '2px', width: '100%' }}
                                    onClick={() => { confirmAddDay(user.routine.id, dayToAdd) }}
                                >
                                    CONFIRMAR
                                </Button>
                                <Button
                                    sx={{background: 'linear-gradient(90deg, #4d4d4d, #b3b3b3)', color: 'white', marginTop: '10px', marginBottom: '30px', width: '100%' }}
                                    onClick={handleCancelAddDay}
                                >CANCELAR</Button>
                            </AddnewDayContainer>
                        ) : null}
                        <RoutineContainer >
                            {user.routine.DayOfWeeks.map((day, dayIndex) => (
                                <RoutineDisplay key={dayIndex}>
                                    <DayMenuContainer>
                                        <CustomTypography>{`Día ${day.id}`}</CustomTypography>

                                        <Tooltip content="Agregar ejercicio" color="white" placement="top" arrow="true" style={{backgroundColor:'black', borderRadius:'10px',color:'white',padding:'5px',boxShadow:'0 4px 8px rgba(0, 0, 0, 0.15)',fontFamily:'Nunito',transition: 'opacity 0.2s ease, transform 0.2s ease',transitionDelay: '0s'}}>
                                            <span> {/* Añadir un span envolviendo el IconButton */}
                                                <IconButton
                                                    onClick={() => { handleDay(day.id); handleAddExercise(day.id) }}
                                                >
                                                    <AddBoxIcon sx={{ color: 'black', fontSize: '1.5em', marginBottom: '5px', marginLeft: '15px' }} />
                                                </IconButton>
                                            </span>
                                        </Tooltip>
                                        <Tooltip  content="Eliminar día" color="white" placement="top" arrow="true" style={{backgroundColor:'black', borderRadius:'10px',color:'white',padding:'5px',boxShadow:'0 4px 8px rgba(0, 0, 0, 0.15)',fontFamily:'Nunito',transition: 'opacity 0.2s ease, transform 0.2s ease',transitionDelay: '0s'}}>
                                            <span>
                                            <IconButton
                                                onClick={() => { handleDeleteDay(user.routine.id, day.id) }}
                                            >
                                                <DeleteForeverIcon sx={{ color: 'black', fontSize: '1.5em', marginBottom: '5px', marginLeft: '15px' }} />
                                            </IconButton>
                                            </span>
                                        </Tooltip>
                                    </DayMenuContainer>
                                    {isAddingDayId === day.id && (
                                        <AddExerciseContainer>
                                            <ExerciseSelectorContainer>
                                                <RoutineNavBar filterValues={filterValues(exercises)} handleSelectChange={handleSelectChange} />

                                                <MobileExerciseSelector
                                                    exercises={filteredExercises.length > 0 ? filteredExercises : exercises}
                                                    handleExerciseSelection={handleExerciseSelection}
                                                />
                                                {currentExercise !== null && (
                                                    <Box>
                                                        <Typography sx={{ color: 'black' }}>series y reps</Typography>
                                                        <TextField
                                                            key={currentExercise}
                                                            sx={{ ...textFieldDetailStyles }}
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
                                                <AddExerciseButtonContainer>
                                                    <Button
                                                        onClick={() => { handleSaveNewExercise(user.routine.id, addExercise) }}
                                                        sx={{ background: 'linear-gradient(45deg, #C004FF, #730399)', color: 'white', width: '100%' }}
                                                    >
                                                        GRABAR CAMBIOS
                                                    </Button>
                                                    <Button
                                                        onClick={handleCancelAddExercise}
                                                        sx={{ background: 'linear-gradient(90deg, #4d4d4d, #b3b3b3)', color: 'white', marginTop: '10px' }}
                                                    >
                                                        CANCELAR
                                                    </Button>
                                                </AddExerciseButtonContainer>

                                            </ExerciseSelectorContainer>
                                        </AddExerciseContainer>
                                    )}
                                    {day.Exercises.map((exercise, exerciseIndex) => (
                                        <Box key={exercise.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                                            {editingIndices.dayIndex === dayIndex && editingIndices.exerciseIndex === exerciseIndex ? (
                                                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                    <Typography sx={{ color: 'white', marginBottom: '10px' }}>{exercise.nombre}</Typography>
                                                    <TextField
                                                        label="Sets y Reps"
                                                        variant="outlined"
                                                        value={setsAndReps}
                                                        name="setsAndReps"
                                                        onChange={handleInputChange}
                                                        sx={textFieldDetailStyles}
                                                    />
                                                    <Button onClick={() => { handleSave(exercise.id) }} sx={{ background: 'linear-gradient(45deg, #C004FF, #730399)', color: 'white', marginTop: '10px' }}>Grabar cambios</Button>
                                                    <Button onClick={handleCancel} sx={{ background: 'linear-gradient(90deg, #4d4d4d, #b3b3b3)', color: 'white', marginTop: '10px' }}>Cancelar</Button>
                                                </Box>
                                            ) : (
                                                <>
                                                    <RoutineTypography>{exercise.nombre}</RoutineTypography>
                                                    <ButtonContainer>
                                                        <Button onClick={() => handleEdit(dayIndex, exerciseIndex, exercise.id)} sx={{ background: 'linear-gradient(45deg, #C004FF, #730399)', color: 'white' }}>Editar</Button>
                                                        <Button sx={{ background: 'linear-gradient(90deg, #4d4d4d, #b3b3b3)', color: 'white' }}
                                                            onClick={() => handleDelete(exercise.id,day.id)}
                                                        >Eliminar</Button>
                                                    </ButtonContainer>
                                                </>
                                            )}
                                        </Box>
                                    ))}
                                </RoutineDisplay>
                            ))}
                        </RoutineContainer>
                    </UserContainer>
                ) : (
                    <CustomTypography>El usuario no tiene rutina creada aún</CustomTypography>
                )
            )}
                </MainContentContainer>
           
            <PictureRightContainer></PictureRightContainer>
            </ContentContainer>
           
        </MainContainer>
    );
};

export default UpdateRoutine;

const MainContainer = styled(Box)(({ theme }) => ({
    width: '100vw',
    minHeight: '100vh',
    padding: '15px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    

    [theme.breakpoints.up('md')]: {
        width: 'calc(100vw - 240px)',
       height:'100vh',
        marginLeft: '240px',
        padding: '0',
        boxSizing:'border-box',
        

      },
}));

const ContentContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    

    [theme.breakpoints.up('md')]: {
       display:'flex',
       flexDirection:'row',
       
      },
}));

const MainContentContainer = styled(Box)(({ theme }) => ({
    width:'100%',
    backgroundColor:'white',

    [theme.breakpoints.up('md')]: {
       width:'60%',
       height:'100%',
       display:'flex',
       flexDirection:'column',
       alignItems:'center',
       backgroundColor:'white',
      overflowY: 'auto', // Habilita el scroll en pantallas más grandes también
       maxHeight: '100vh', // Asegura que el scroll también funcione en dispositivos má
       
      },
}));

const PictureleftContainer = styled(Box)(({ theme }) => ({
   

    [theme.breakpoints.up('md')]: {
       width:'25%',
       height:'100%',
       backgroundImage: `url(${picture1})`, // Aplicamos la imagen
        backgroundSize: 'cover', // Hace que la imagen cubra todo el contenedor
        backgroundPosition: 'center', // Centra la imagen
        backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
       
      },
}));

const PictureRightContainer = styled(Box)(({ theme }) => ({
   
    

    [theme.breakpoints.up('md')]: {
       
        width:'25%',
        height:'100%',
        backgroundImage: `url(${picture2})`, // Aplicamos la imagen
         backgroundSize: 'cover', // Hace que la imagen cubra todo el contenedor
         backgroundPosition: 'center', // Centra la imagen
         backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
        
       
      },
}));

const CustomTitle = styled(Typography)(({ theme }) => ({
    marginTop:'50px',
   // marginBottom:'25px',
    fontFamily: "Nunito",
    fontWeight: '700',
    fontSize: '3em',
    color: 'black',
    textAlign:'center'
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
    fontFamily: "Nunito",
    fontSize: '2em',
    color: 'black',
    textAlign:'center'
}));

const UserContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: '15px',
    boxSizing:'border-box',

    [theme.breakpoints.up('md')]: {
        width: '100%',
        padding:'15px',
        boxSizing:'border-box'
      },
}));

const SearchBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    [theme.breakpoints.up('md')]: {
        width: '40%',
       
        boxSizing:'border-box'
      },
}));


const RoutineContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto', // Habilita el scroll en pantallas más grandes también
       maxHeight: '100vh', // Asegura que el scroll también funcione en dispositivos má

    [theme.breakpoints.up('md')]: {
        width: '100%',
        maxHeight:'400px',
       
        boxSizing:'border-box'
      },
}));

const RoutineDisplay = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '15px',
    borderBottom: '1px solid gray'
}));

const textFieldStyles = {
    width: '100%',
    '& .MuiInputBase-input': {
        color: 'black', // El color del texto
       backgroundColor: 'white', // El fondo del campo de entrada
    },
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'white', // Fondo blanco del input completo
        color:'black',
        '& fieldset': {
            borderColor: 'black', // Color del borde por defecto
        },
        '&:hover fieldset': {
            borderColor: 'violet', // Color del borde al hacer hover
        },
        '&.Mui-focused fieldset': {
            borderColor: 'violet', // Color del borde cuando está enfocado
           // backgroundColor:'white',
          //  color:'black'

        },
    },
    '& .MuiInputLabel-root': {
        color: 'white', // Color de la etiqueta
    }
};

const textFieldDetailStyles = {
    width: '100%',
    marginBottom: '10px',
    '& .MuiInputBase-input': {
        color: 'black'
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'black',
        },
        '&:hover fieldset': {
            borderColor: 'violet',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'violet',
        },
    },
    '& .MuiInputLabel-root': {
        color: 'black',
    }
};

const RoutineTypography = styled(Typography)(({ theme }) => ({
    color: 'black'
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '10px'
}));

const AddExerciseButtonContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column'

}));

const DayMenuContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    display: 'flex',
    alignItems: 'center'

}));


const CustomTooltip = styled(Tooltip)(({ theme }) => ({
    tooltip: {
        backgroundColor: '#0028ff',
        color: 'black',
        fontSize: '0.75rem',
        borderRadius: '4px',
        padding: '8px'
    }
}));

const AddExerciseContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}));

const ExerciseSelectorContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '25px'
}));

const AddnewDayContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
   // marginTop: '20px',
    marginBottom: '20px',
    borderBottom: 'solid 1px blue'


}));
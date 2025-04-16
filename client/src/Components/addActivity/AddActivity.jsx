import React, { useEffect,useState } from "react";
import { useActivitiesStore } from "../../store/useActiviriesStore";
import { Select, MenuItem, Box, InputLabel, FormControl, Typography, Button,IconButton  } from "@mui/material";
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import Cookies from 'js-cookie';  // Importa js-cookie
import {jwtDecode} from 'jwt-decode';  // Importa jwt-decode

const AddActivity = ({ selectedActivity, setSelectedActivity, handleActivityChange, userDni , setIsEditing}) => {
    const [TenantId, setTenantId] = useState('');
    const { activities, fetchActivities, userActivities, fetchUserActivities, deleteUserActivity } = useActivitiesStore();
    console.log(userActivities);
    
    useEffect(() => {
        const token = Cookies.get('token');
        console.log('token desde addActivity',token);
        
        const decoded = jwtDecode(token);
        console.log('decoded desde addActivity',decoded);
        if(decoded){
            setTenantId(decoded.TenantId);
        }
       ;


    }, []);

    useEffect(() => {
        if(TenantId){
            fetchActivities(TenantId);
        }
        
    }, [fetchActivities,TenantId]);

    
    useEffect(() => {
        if (userDni) {
            fetchUserActivities(userDni,TenantId);
        }
    }, [fetchUserActivities, userDni]);

    const handleDeleteUserActivity = async (userDni, activityId) => {
        try {
           const deletedActivity = await deleteUserActivity(userDni, activityId);
           if(deleteUserActivity){
            Swal.fire({
                icon: 'success',
                title: 'Excelente!',
                text: 'Actividad eliminada exitosamente.',
                showConfirmButton: true,
               // timer: 2000
            });
            await setSelectedActivity('')
            await fetchUserActivities(userDni);
           }
           
           // await setIsEditing(false);
        } catch (error) {
            console.error("Error deleting user activity:", error);
        }
    };

    // Extract user activity IDs
    const userActivityIds = new Set(userActivities.map(activity => activity.ActivityId));

    return (
        <Box>
            {activities && activities.length > 0 ? (
                <FormControl fullWidth sx={{ ...formControlStyles }}>
                    <InputLabel sx={{ color: 'black' }}>Actividades</InputLabel>
                    <Select
                        value={selectedActivity}
                        onChange={handleActivityChange}
                        label="Actividades"
                        sx={{
                            ...textFieldStyles,
                            borderRadius: '5px',
                            '& .MuiSelect-select': {
                                color: 'black', // Asegúrate de que el texto seleccionado sea negro
                            },
                            '&.Mui-focused .MuiSelect-select': {
                                color: 'black', // Asegúrate de que el texto sea negro al estar enfocado
                            },
                            '&.MuiSelect-outlined .MuiSelect-select': {
                                color: 'black', // Color del texto para el valor seleccionado
                            },
                            '& .MuiInputLabel-root': {
                                color: 'black', // Asegúrate de que la etiqueta sea siempre negra
                                '&.Mui-focused': {
                                    color: 'black', // Mantener negro cuando está enfocado
                                },
                                
                            },
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    bgcolor: 'lightgray',
                                    '& .MuiMenuItem-root': {
                                        color: 'black',
                                    },
                                },
                            },
                        }}
                    >
                        <MenuItem value="">
                            <em>Seleccionar actividad</em>
                        </MenuItem>
                        {activities.map((activity) => (
                            <MenuItem
                                key={activity.id}
                                value={activity.id}
                                sx={{
                                    backgroundColor: userActivityIds.has(activity.id) ? '#B39DDB' : 'transparent',
                                  
                                    '&:hover': {
                                        backgroundColor: userActivityIds.has(activity.id) ? '#B39DDB' : '#B39DDB',
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        flex: 1,
                                        fontFamily:'Nunito',
                                        fontWeight:'500',
                                        fontSize:'16px',
                                        color: userActivityIds.has(activity.id) ? 'black' : 'black',
                                    }}
                                >
                                    {activity.nombre}
                                </Typography>
                                {userActivityIds.has(activity.id) && (
                                    <IconButton
                                    onClick={() => handleDeleteUserActivity(userDni, activity.id)}
                                    sx={{
                                        color: 'black', // Color negro para el ícono
                                        ml: 1,
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                )}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : null}
        </Box>
    );
};

export default AddActivity;

const formControlStyles = {
    width: '100%',
    backgroundColor: 'white', // Fondo blanco para el select
    borderRadius: '5px', // Ajustar el border-radius aquí también
    '& .MuiInputBase-root': {
        color: 'black', // Texto negro
        fontFamily: 'Nunito, sans-serif', // Aplicar tipografía Nunito
        fontSize: '16px', // Tamaño de fuente 16px
        padding: '8px 14px',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none', // Sin borde por defecto
        },
        '&:hover fieldset': {
            border: 'none', // Sin borde en hover
        },
        '&.Mui-focused fieldset': {
            border: 'none', // Mantener sin borde cuando está enfocado
        },
    },
    '& .MuiInputLabel-root': {
        color: 'black', // Etiquetas en negro para que sean legibles
        fontFamily: 'Nunito, sans-serif', // Aplicar tipografía Nunito
        fontWeight: 500, // Peso medio
        fontSize: '16px', // Tamaño de fuente 16px
    },
    
};

const textFieldStyles = {
    width: '100%',
    backgroundColor: 'white', // Fondo blanco para el select
    '& .MuiInputBase-input': {
        color: 'black', // Texto negro
        fontFamily: 'Nunito, sans-serif', // Aplicar tipografía Nunito
        fontWeight: 500, // Medium (peso 500)
        fontSize: '16px', // Tamaño de fuente 16px
        padding: '8px 14px', // Ajustar el padding según sea necesario
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: '5px', // Asegúrate de que el texto tenga borderRadius
        '& fieldset': {
            border: 'none', // Sin borde por defecto
        },
        '&:hover fieldset': {
            border: 'none', // Sin borde en hover
        },
        '&.Mui-focused fieldset': {
            border: 'none', // Mantener sin borde cuando está enfocado
        },
    },
};


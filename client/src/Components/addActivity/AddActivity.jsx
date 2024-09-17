import React, { useEffect } from "react";
import { useActivitiesStore } from "../../store/useActiviriesStore";
import { Select, MenuItem, Box, InputLabel, FormControl, Typography, Button } from "@mui/material";
import Swal from 'sweetalert2';

const AddActivity = ({ selectedActivity, setSelectedActivity, handleActivityChange, userDni , setIsEditing}) => {
    const { activities, fetchActivities, userActivities, fetchUserActivities, deleteUserActivity } = useActivitiesStore();
    console.log(userActivities);
    
    useEffect(() => {
        fetchActivities();
    }, [fetchActivities]);

    
    useEffect(() => {
        if (userDni) {
            fetchUserActivities(userDni);
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
           
            await setIsEditing(false);
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
                    <InputLabel sx={{ color: 'white' }}>Actividades</InputLabel>
                    <Select
                        value={selectedActivity}
                        onChange={handleActivityChange}
                        label="Actividades"
                        sx={{ ...textFieldStyles }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    bgcolor: '#2E3B55',
                                    '& .MuiMenuItem-root': {
                                        color: 'white',
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
                                    backgroundColor: userActivityIds.has(activity.id) ? '#3A4A6B' : 'transparent',
                                    '&:hover': {
                                        backgroundColor: userActivityIds.has(activity.id) ? '#2E3B55' : '#3A4A6B',
                                    },
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        flex: 1,
                                        color: userActivityIds.has(activity.id) ? '#FFD700' : 'white',
                                    }}
                                >
                                    {activity.nombre}
                                </Typography>
                                {userActivityIds.has(activity.id) && (
                                    <Button
                                        onClick={() => handleDeleteUserActivity(userDni, activity.id)}
                                        sx={{
                                            color: '#FFD700',
                                            ml: 1,
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        ELIMINAR
                                    </Button>
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
    '& .MuiInputBase-root': {
        color: 'white',
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

const textFieldStyles = {
    width: '100%',
    '& .MuiInputBase-input': {
        color: 'white',
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
};

import React from "react";
import { TextField, MenuItem } from "@mui/material";

const MobileExerciseSelector = ({ exercises, handleExerciseSelection }) => {
    return (
        <TextField
            select
            label="Selecciona Ejercicio"
            variant="outlined"
            onChange={handleExerciseSelection}
            sx={{
                width: '100%',
                backgroundColor:'white',
                borderRadius:'5px',
               // margin:'0px',
               // border:'1px solid green',
                '& .MuiInputBase-input': {
                    color: 'black',
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
                    color: 'black',
                },
            }}
            InputLabelProps={{
                style: { color: 'black' },
            }}
        >
            {exercises.map((exercise) => (
                <MenuItem
                    key={exercise.id}
                    value={exercise.id}
                    sx={{ color: 'black' }}
                >
                    {exercise.nombre}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default MobileExerciseSelector;

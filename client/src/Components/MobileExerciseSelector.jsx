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
                width: '200px',
                marginBottom: '16px',
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
                '& .MuiInputLabel-root': {
                    color: 'white',
                },
            }}
            InputLabelProps={{
                style: { color: 'white' },
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

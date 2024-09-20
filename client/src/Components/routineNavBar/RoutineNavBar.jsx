import React from 'react';
import { TextField, MenuItem, Box, styled } from '@mui/material';

const RoutineNavBar = ({ filterValues = [], handleSelectChange }) => {
    return (
        <SelectContainer>
            <TextField
                select
                label="Grupo Muscular"
                onChange={(event) => handleSelectChange(event.target.value)}
                sx={{
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
                    '& .MuiInputLabel-root': {
                        color: 'white',
                    },
                }}
                InputLabelProps={{
                    style: { color: 'white' },
                }}
            >
                {filterValues.map((item, index) => (
                    <MenuItem key={index} value={item} sx={{ color: 'black' }}>
                        {item}
                    </MenuItem>
                ))}
            </TextField>
        </SelectContainer>
    );
};


export default RoutineNavBar;

const SelectContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
}));
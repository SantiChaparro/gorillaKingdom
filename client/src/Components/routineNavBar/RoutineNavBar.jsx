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
                    backgroundColor:'white',
                    borderRadius:'5px',
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


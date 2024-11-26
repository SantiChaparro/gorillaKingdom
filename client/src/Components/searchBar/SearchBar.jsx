import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

const SearchBar = ({ handleSearch, resetSearchValue }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        handleSearch(value);
    };

    useEffect(() => {
        if (resetSearchValue) {
            setSearchTerm('');
        }
    }, [resetSearchValue]);

    return (
        <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', gap: '1em', alignContent: 'center', margin: '1em', boxSizing: 'border-box' }}>
            <TextField
                variant="outlined"
                placeholder="Buscar..."
                size="small"
                value={searchTerm}
                onChange={handleChange}
                sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: '#ca99ef', // Cambiar el color del borde a violeta
                           
                        },
                        '&:hover fieldset': {
                            borderColor: '#ca99ef', // Cambiar el color del borde al pasar el mouse
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#ca99ef', // Cambiar el color del borde cuando el input está enfocado
                        },
                        '& .MuiInputBase-input': {
                            color: 'black', // Cambiar el color del texto a negro
                        },
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="end">
                            <IconButton size="small">
                                <SearchIcon sx={{ color: 'black' }} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

export default SearchBar;

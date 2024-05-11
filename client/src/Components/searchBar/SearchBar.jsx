import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';

const SearchBar = () => {
    const handleSearch = () => {
        // Aquí puedes agregar la lógica para manejar la búsqueda
        console.log('Realizando búsqueda...');
    };

    return (
        <>
       <Box
       sx={{width:'45vw', height:'auto',display:'flex',flexDirection:'row',gap:'1em', alignContent:'center', margin:'1em'}}>
       <TextField
            variant="outlined"
            placeholder="Buscar..."
            size="small"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleSearch} size="small">
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
      
       </Box>
        
        
        </>
        
    );
};

export default SearchBar;
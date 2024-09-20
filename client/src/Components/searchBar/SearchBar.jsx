import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

const SearchBar = ({ handleSearch , resetSearchValue}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        handleSearch(value);
    };

    useEffect(()=>{
        if(resetSearchValue){
            setSearchTerm('');
        }
    },[resetSearchValue])

    return (
        <Box sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', gap: '1em', alignContent: 'center', margin: '1em', boxSizing: 'border-box' }}>
            <TextField
                variant="outlined"
                placeholder="Buscar..."
                size="small"
                sx={{ width: '100%' }}
                value={searchTerm}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="end">
                            <IconButton size="small">
                                <SearchIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
};

export default SearchBar;

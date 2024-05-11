import React, {useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Box, MenuItem } from '@mui/material';
import {useExercisesStore} from '../../store/useExercisesStore';

const RoutineNavBar = ({filterValues,handleSelectChange}) => {
    const {exercises , fetchExercises} = useExercisesStore();
    const [filterOption , setFilterOption] = useState("");
    
    console.log(filterOption);

    
    const handleFilterChange = (event) => {
        const newValue = event.target.value;
        setFilterOption(newValue);
        handleSelectChange(newValue, exercises);
    };

    return (
        <>
       <Box
       sx={{width:'45vw', height:'auto',display:'flex',flexDirection:'row',gap:'1em', alignContent:'center', margin:'1em'}}
       >

         <TextField
         select
         variant='outlined'
         size='small'
         value={filterOption}
         handleSelectChange={handleSelectChange}
         onChange={handleFilterChange}
         
         >
          {filterValues(exercises).map((value,index) =>
            
            <MenuItem  key={index} value={value}>{value}</MenuItem>
            
          )}
         </TextField>
       </Box>
        
        
        </>
        
    );
};

export default RoutineNavBar;

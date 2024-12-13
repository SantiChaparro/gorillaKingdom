import { useState, useEffect } from 'react';
import { Autocomplete, TextField, Select, MenuItem, Button, styled, Box } from '@mui/material';
import { useUsersStore } from '../../store/useUsersStore';
import debounce from 'lodash.debounce';

// Estilos personalizados para fondo oscuro
const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: '45%',
  marginBottom: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper, // Fondo claro para el input
  '& .MuiInputBase-input': {
    color: theme.palette.text.primary, // Color de texto oscuro
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#8A2BE2', // Borde violeta en estado normal (usa el color que prefieras)
    },
    '&:hover fieldset': {
      borderColor: '#9400D3', // Borde violeta oscuro al pasar el ratón (o el tono que prefieras)
    },
    '&.Mui-focused fieldset': {
      borderColor: '#9400D3', // Borde violeta cuando el campo está enfocado
    },
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  width: '45%',
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper, // Fondo claro para el select
  '& .MuiSelect-select': {
    color: theme.palette.text.primary, // Color de texto oscuro
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#8A2BE2', // Borde violeta
    },
    '&:hover fieldset': {
      borderColor: '#9400D3', // Borde violeta más oscuro al pasar el ratón
    },
    '&.Mui-focused fieldset': {
      borderColor: '#9400D3', // Borde violeta más oscuro al enfocar
    },
  },
}));


const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
 // marginTop: '16px', // Margen superior para dispositivos pequeños
  background: 'linear-gradient(45deg, #C004FF, #730399)',
  color: 'white', // Color del texto del botón
  [theme.breakpoints.up('md')]: {
    marginTop: '50px', // Mayor margen superior para pantallas más grandes (desktop)
  },
}));

const PaymentFilter = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [month, setMonth] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const { users, searchedUser, getUserByName, getUserById, clearSearchedUser } = useUsersStore(state => ({
    users: state.users,
    searchedUser: state.searchedUser,
    getUserByName: state.getUserByName,
    getUserById: state.getUserById,
    clearSearchedUser: state.clearSearchedUser
  }));

  const [loading, setLoading] = useState(false);

  // Función para buscar usuarios con debounce
  const fetchUsers = debounce(async (term) => {
    setLoading(true);
    try {
      if (/^\d+$/.test(term)) {
        await getUserById(term);
      } else {
        await getUserByName(term);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
    setLoading(false);
  }, 500);

  // Efecto que se activa cuando cambia el término de búsqueda
  useEffect(() => {
    if (searchTerm) fetchUsers(searchTerm);
    return () => clearSearchedUser();
  }, [searchTerm]);

  // Maneja la búsqueda con los filtros seleccionados
  const handleSearch = (month, selectedUser) => {
    onFilterChange({ month, dni: selectedUser?.dni });
  };

  return (
    <Box sx={{width:'100%'}}>
      <Box sx={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
        <StyledAutocomplete
          options={searchedUser || []}
          getOptionLabel={(option) => `${option.dni} - ${option.name}`}
          loading={loading}
          onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
          onChange={(event, newValue) => setSelectedUser(newValue)}
          renderInput={(params) => (
            <StyledTextField {...params} label="Buscar por DNI o Nombre" variant="outlined" />
          )}
        />

        {/* Selector de mes */}
        <StyledSelect
          value={month}
          onChange={(event) => setMonth(event.target.value)}
          displayEmpty
        >
          <MenuItem value="">Todos los meses</MenuItem>
          <MenuItem value="1">Enero</MenuItem>
          <MenuItem value="2">Febrero</MenuItem>
          <MenuItem value="3">Marzo</MenuItem>
          <MenuItem value="4">Abril</MenuItem>
          <MenuItem value="5">Mayo</MenuItem>
          <MenuItem value="6">Junio</MenuItem>
          <MenuItem value="7">Julio</MenuItem>
          <MenuItem value="8">Agosto</MenuItem>
          <MenuItem value="9">Septiembre</MenuItem>
          <MenuItem value="10">Octubre</MenuItem>
          <MenuItem value="11">Noviembre</MenuItem>
          <MenuItem value="12">Diciembre</MenuItem>
        </StyledSelect>
      </Box>


      <StyledButton variant="contained" onClick={()=>{handleSearch(month,selectedUser)}}>Buscar</StyledButton>
    </Box>
  );
};

export default PaymentFilter;

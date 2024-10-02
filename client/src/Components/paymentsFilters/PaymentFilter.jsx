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
      borderColor: theme.palette.text.primary, // Borde del input
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main, // Borde al pasar el ratón
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
      borderColor: theme.palette.text.primary, // Borde del select
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main, // Borde al pasar el ratón
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width:'100%',
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main, // Fondo del botón
  color: theme.palette.text.secondary, // Color del texto del botón
  '&:hover': {
    backgroundColor: theme.palette.primary.dark, // Fondo del botón al pasar el ratón
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
    <Box sx={{width:'100%',padding:'20px'}}>
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

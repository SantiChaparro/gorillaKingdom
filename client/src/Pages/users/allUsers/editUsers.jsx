import React, { useState, useEffect } from "react";
import { useUsersStore } from '../../../store/useUsersStore';
import {
    Box,
    Typography,
    Button,
    TextField,
    styled,
    createTheme,
    ThemeProvider
} from '@mui/material';
import SearchBar from "../../../Components/searchBar/SearchBar";
import Loader from "../../../Components/loader/Loader";
import AddActivity from "../../../Components/addActivity/AddActivity";
import { useActivitiesStore } from "../../../store/useActiviriesStore";
import Swal from 'sweetalert2';

const EditUsers = () => {
    const { users, fetchUsers, modifyUser, searchedUser, getUserByName } = useUsersStore();
    const {addActivity} = useActivitiesStore();
    const [isEditing, setIsEditing] = useState(null);
    const [preEditUser, setPreEditUser] = useState(null);
    const [activeUsers, setActiveUsers] = useState([]);
    const [values, setValues] = useState({
        nombre: "",
        dni: "",
        fecha_nacimiento: "",
        domicilio: "",
        mail: "",
        telefono: ""
    });
    const [searchValue, setSearchValue] = useState('');
    const [resetSearchValue , setResetSearchValue] = useState(false)
    const [loading , setLoading] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState('');
   
    console.log(users);
    console.log('actividad seleccionada desde edicion usuario',selectedActivity);
    
    
    const fetchData = async () => {
            setLoading(true);
            await fetchUsers();
            setLoading(false);
    };

    useEffect(() => {
        
        fetchData();
    }, [fetchUsers]);

    useEffect(() => {
        fetchActiveUsers();
    }, [users, searchedUser, searchValue,selectedActivity]);

    const fetchActiveUsers = async () => {
        if (searchedUser && searchedUser.length > 0) {
            const filteredUsers = searchedUser.filter(user => user.activo === true);
            setActiveUsers(filteredUsers);
        } else {
            const filteredUsers = users.filter(user => user.activo === true);
            setActiveUsers(filteredUsers);
        }
    };

    const handleEdit = (index, user) => {
        setPreEditUser(user); // Guarda el usuario antes de la edición
        setValues({
            nombre: user.nombre,
            dni: user.dni,
            fecha_nacimiento: user.fecha_nacimiento,
            domicilio: user.domicilio,
            mail: user.mail,
            telefono: user.telefono,
            activo: user.activo
        });
        setIsEditing(index);
    };

    const handleCancelEdit = () => {
        setIsEditing(null);
    };

    const handleSave = async (dni) => {
        try {
            const dataToUpdate = compareObjects(preEditUser, values);
    
            const modifiedUser = await modifyUser(dni, dataToUpdate);
    
            if (selectedActivity) {
                const addedActivity = await addActivity(dni, selectedActivity);
                setSelectedActivity('');
            }
    
            // Mensaje de éxito con SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Excelente!',
                text: 'El usuario ha sido modificado exitosamente.',
                showConfirmButton: true,
               // timer: 2000
            });
    
            setIsEditing(null);
            fetchData();
    
        } catch (error) {
            console.log(error);
    
            // Mensaje de error con SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al modificar el usuario.',
                showConfirmButton: true
            });
        }
    };
    
    
    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({ ...prevValues, [name]: value }));
    };

    const compareObjects = (obj1, obj2) => {
        const dataToUpdate = {};
        for (let key in obj1) {
            if (obj1[key] !== obj2[key] && obj2.hasOwnProperty(key)) {
                dataToUpdate[key] = obj2[key];
            }
        }
        return dataToUpdate;
    };

    const handleDelete = async (dni) => {
        await modifyUser(dni, { activo: false });
        fetchData()
    };

    const handleSearch = async (name) => {
        setSearchValue(name); 
        getUserByName(name); 
    };

    const handleActivityChange = (event) => {
        setSelectedActivity(event.target.value);
    };

   

    const theme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiInputBase-root': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': {
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
                    },
                    '& .MuiTextField-root.dni': {
                        '& .MuiInputBase-root': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root': {
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
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <MainContainer>
                <CustomTypography>Editar usuario</CustomTypography>
                <SearchBarContainer>
                    <SearchBar handleSearch={handleSearch} resetSearchValue={resetSearchValue} />
                </SearchBarContainer>
                {loading ? (
                    <Loader /> 
                ) : (
                    activeUsers.map((user, index) => {
                        return (
                            <UserContainer key={user.dni}>
                                {isEditing === index ? (
                                    <IsEditingContainer>
                                        <TextField
                                            label="Nombre"
                                            value={values.nombre}
                                            onChange={handleFieldChange}
                                            name="nombre"
                                        />
                                        <TextField
                                            label="DNI"
                                            value={values.dni}
                                            onChange={handleFieldChange}
                                            name="dni"
                                            className="dni"
                                            InputProps={{ readOnly: true }}
                                        />
                                        <TextField
                                            label="Fecha nacimiento"
                                            value={values.fecha_nacimiento}
                                            onChange={handleFieldChange}
                                            name="fecha_nacimiento"
                                        />
                                        <TextField
                                            label="Domicilio"
                                            value={values.domicilio}
                                            onChange={handleFieldChange}
                                            name="domicilio"
                                        />
                                        <TextField
                                            label="Mail"
                                            value={values.mail}
                                            onChange={handleFieldChange}
                                            name="mail"
                                        />
                                        <TextField
                                            label="Telefono"
                                            value={values.telefono}
                                            onChange={handleFieldChange}
                                            name="telefono"
                                        />
                                        <AddActivity 
                                        selectedActivity={selectedActivity} 
                                        setSelectedActivity={setSelectedActivity} 
                                        handleActivityChange={handleActivityChange} 
                                        userDni = {values.dni}
                                        setIsEditing={setIsEditing}
                                        />
                                        <StyledButton onClick={() => handleSave(user.dni)} variant="contained">Guardar</StyledButton>
                                        <CancelButton onClick={handleCancelEdit} variant="contained">Cancelar</CancelButton>
                                    </IsEditingContainer>
                                ) : (
                                    <FlexContainer>
                                        <FlexItem>
                                            <Typography>{user.nombre}</Typography>
                                        </FlexItem>
                                        <ButtonContainer>
                                            <Typography>{user.dni}</Typography>
                                            <EditButton onClick={() => handleEdit(index, user)} variant="contained">Editar</EditButton>
                                            <DeleteButton onClick={() => handleDelete(user.dni)} variant="contained">Eliminar</DeleteButton>
                                        </ButtonContainer>
                                    </FlexContainer>
                                )}
                            </UserContainer>
                        );
                    })
                )}
            </MainContainer>
        </ThemeProvider>
    );
};

export default EditUsers;

const MainContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    padding: '10px',
    backgroundColor: 'black',
    color: 'white',
}));

const SearchBarContainer = styled(Box)(({theme})=>({
    width:'100%',
    height:'auto',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginBottom:'25px'
}))

const UserContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    borderBottom: '1px solid blue',
    alignItems: 'center',
    padding: '5px 0',
    boxSizing: 'border-box',
    color: 'white',
}));

const IsEditingContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1em',
    margin:'25px 0'
}));

const FlexContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
}));

const FlexItem = styled(Box)(({ theme }) => ({
    flex: '1 1 30%',
    minWidth: '100px',
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: '0.5em',
    flex: '1 1 30%',
    justifyContent: 'flex-end',
    alignItems: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'blue',
    color: 'white',
    '&:hover': {
        backgroundColor: '#1E90FF',
    },
}));

const CancelButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#8a0bd2',
    color: 'white',
    '&:hover': {
        backgroundColor: '#e2cef6',
    },
}));

const EditButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#0028ff',
    color: 'white',
    '&:hover': {
        backgroundColor: '#3366ff',
    },
}));

const DeleteButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#8a0bd2',
    color: 'white',
    '&:hover': {
        backgroundColor: '#e2cef6',
    },
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
    marginTop:'100px',
    fontFamily: "Bebas Neue",
    fontWeight: '400',
    fontSize: '3em',
    color: 'white',
    textAlign: 'center',
    marginBottom: '50px',
}));

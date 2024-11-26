import React, { useState, useEffect } from "react";
import { useUsersStore } from '../../../store/useUsersStore';
import {
    Box,
    Typography,
    Button,
    TextField,
    styled,
    createTheme,
    ThemeProvider,
    Modal,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    IconButton
} from '@mui/material';
import SearchBar from "../../../Components/searchBar/SearchBar";
import Loader from "../../../Components/loader/Loader";
import AddActivity from "../../../Components/addActivity/AddActivity";
import { useActivitiesStore } from "../../../store/useActiviriesStore";
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { border, boxSizing, display, height, maxWidth, padding, width } from "@mui/system";
import edituser from '../../../assests/imagenes/edituser1.png';
import edituser2 from '../../../assests/imagenes/edituser2.png';

const EditUsers = () => {
    const { users, fetchUsers, modifyUser, searchedUser, getUserByName } = useUsersStore();
    const { addActivity } = useActivitiesStore();
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
    const [resetSearchValue , setResetSearchValue] = useState(false);
    const [loading , setLoading] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState('');
    const [openModal, setOpenModal] = useState(false);  // Controla la visibilidad del modal
   
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
    }, [users, searchedUser, searchValue, selectedActivity]);

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
        setOpenModal(true);  // Abre el modal cuando se hace clic en editar
    };

    const handleCancelEdit = () => {
        setIsEditing(null);
        setOpenModal(false);  // Cierra el modal
    };

    const handleSave = async (dni) => {
        try {
            const dataToUpdate = compareObjects(preEditUser, values);
    
            const modifiedUser = await modifyUser(dni, dataToUpdate);
    
            if (selectedActivity) {
                const addedActivity = await addActivity(dni, selectedActivity);
                setSelectedActivity('');
            }
    
            Swal.fire({
                icon: 'success',
                title: 'Excelente!',
                text: 'El usuario ha sido modificado exitosamente.',
                showConfirmButton: true,
            });
    
            setIsEditing(null);
            setOpenModal(false);  // Cierra el modal
            fetchData();
    
        } catch (error) {
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
        fetchData();
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
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <MainContainer>
                <PictureLeft>
                    {/* <img src={edituser}/> */}
                   <CustomParagraph>
                    <ComentTitle>" El mejor sistema de gestión "</ComentTitle>
                    <br/>
                    <ComentParagraph>
                        Modificar los datos de mis usuarios relamente es facil y rápido.
                    </ComentParagraph>
                   </CustomParagraph>
                </PictureLeft>
                <ContentContainer>
                <CustomTypography>Editar usuario</CustomTypography>
                <SearchBarContainer>
                    <SearchBar handleSearch={handleSearch} resetSearchValue={resetSearchValue} />
                </SearchBarContainer>
                {loading ? (
                    <Loader /> 
                ) : (
                   
                       
                         <CustomTableContainer component={Paper} elevation={4} >
                        <Table sx={{border:'none', height:'100%'}}>
                            <TableHead >
                                <TableRow >
                                    <TableCell sx={{color:'black',textAlign:'center',width:'30%', fontWeight:'600'}}>Usuario</TableCell>
                                    <TableCell sx={{color:'black',textAlign:'center',width:'30%', fontWeight:'600'}}>DNI</TableCell>
                                    <TableCell sx={{color:'black',textAlign:'center',width:'40%', fontWeight:'600'}}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {activeUsers.map((user, index) => (
                                    <TableRow 
                                    key={user.dni}
                                    sx={{
                                        '&:not(:last-child) td': {
                                            borderBottom: '2px solid #ca99ef', // Línea divisoria violeta entre filas
                                        },
                                    }}
                                    >
                                        <TableCell sx={{color:'black',textAlign:'center'}}>{user.nombre}</TableCell>
                                        <TableCell sx={{color:'black',textAlign:'center'}}>{user.dni}</TableCell>
                                        <TableCell>
                                            <ButtonContainer>
                                                <IconButton onClick={() => handleEdit(index, user)} variant="contained">
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(user.dni)} variant="contained">
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </ButtonContainer>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CustomTableContainer>
                    
                   
                   
                )}
                </ContentContainer>
                <PictureR>
                <img src={edituser2}/>
                </PictureR>
            </MainContainer>
            <Modal
                open={openModal}
                onClose={handleCancelEdit}
                aria-labelledby="edit-user-modal"
                aria-describedby="modal-to-edit-user-details"
            >
                <CustomModal >
                    <Typography variant="h6" component="h2" sx={{marginBottom:'20px'}}>Editar Usuario</Typography>
                    <TextField
                        label="Nombre"
                        value={values.nombre}
                        onChange={handleFieldChange}
                        name="nombre"
                        fullWidth
                        sx={{...textFieldStyles}}
                    />
                    <TextField
                        label="DNI"
                        value={values.dni}
                        onChange={handleFieldChange}
                        name="dni"
                        className="dni"
                        InputProps={{ readOnly: true }}
                        fullWidth
                        sx={{...textFieldStyles}}
                    />
                    <TextField
                        label="Fecha nacimiento"
                        value={values.fecha_nacimiento}
                        onChange={handleFieldChange}
                        name="fecha_nacimiento"
                        fullWidth
                        sx={{...textFieldStyles}}
                    />
                    <TextField
                        label="Domicilio"
                        value={values.domicilio}
                        onChange={handleFieldChange}
                        name="domicilio"
                        fullWidth
                        sx={{...textFieldStyles}}
                    />
                    <TextField
                        label="Mail"
                        value={values.mail}
                        onChange={handleFieldChange}
                        name="mail"
                        fullWidth
                        sx={{...textFieldStyles}}
                    />
                    <TextField
                        label="Telefono"
                        value={values.telefono}
                        onChange={handleFieldChange}
                        name="telefono"
                        fullWidth
                        sx={{...textFieldStyles}}
                    />
                    <Box sx={{width:'100%',border:'1px solid black',borderRadius:'5px'}}>
                    <AddActivity 
                        selectedActivity={selectedActivity} 
                        setSelectedActivity={setSelectedActivity} 
                        handleActivityChange={handleActivityChange} 
                        userDni={values.dni}
                        

                      
                    />  
                    </Box>
                    
                    <ModalButtonContainer>
                        <StyledButton onClick={() => handleSave(values.dni)} variant="contained">Guardar</StyledButton>
                        <CancelButton onClick={handleCancelEdit} variant="contained">Cancelar</CancelButton>
                    </ModalButtonContainer>
                </CustomModal>
            </Modal>
        </ThemeProvider>
    );
};

export default EditUsers;

// Estilos con MUI's styled components



const MainContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height:'100vh',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
   // marginTop:'70px',
    overflowX: 'hidden',
    backgroundColor:'white',
    
    // Estilos para diferentes tamaños de pantalla usando el theme
    [theme.breakpoints.up('md')]: {
     width:'calc(100vw - 240px)',
     marginLeft:'240px',
     padding:'0px',
     boxSizing:'border-box',
     overflowX: 'hidden',
    },
  
  }));

  const ContentContainer = styled(Box)(({ theme }) => ({
    width: '100%',
   //    height:'100vh',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    flexGrow: 1,
    
    
    // Estilos para diferentes tamaños de pantalla usando el theme
    [theme.breakpoints.up('md')]: {
      maxWidth:'50%'
    },
  
  }));

  const PictureLeft = styled(Box)(({ theme }) => ({
       display:'none',
    // Estilos para diferentes tamaños de pantalla usando el theme
    [theme.breakpoints.up('md')]: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-end',
        position: 'fixed',
        left: '250px',
        top: 0,
        height: '100%',
        width: '20%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        marginTop:'70px',
        marginBottom:'1000pg',
        backgroundImage:`url(${edituser})`
    
    },
  
  }));

  const PictureR = styled(Box)(({ theme }) => ({
  display:'none',
 [theme.breakpoints.up('md')]: {
    display:'block',
     position: 'fixed',
     right: 0,
     top: 0,
     height: '100vh',
     width: '20%',
     boxSizing: 'border-box',
     overflow: 'hidden',
     marginTop:'70px',
     marginBottom:'1000pg',
     marginRight:'10px',
      backgroundImage:`url(${edituser2})`
 
 },

}));


  const CustomTableContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    maxHeight:'550px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    margin:'0px',
    overflowY:'auto',
    
    // Estilos para diferentes tamaños de pantalla usando el theme
    [theme.breakpoints.up('md')]: {
        maxWidth:'100%',
        maxHeight:'650px',
        overflowY:'auto'
        
    },
  
  }));

  

const CustomTypography = styled(Typography)({
    marginTop:'50px',
    fontFamily: "Nunito",
    fontWeight: '400',
    fontSize: '45px',
    color: 'black',
    textAlign: 'center',
    marginBottom:'30px',
    fontWeight: 'bold', 
});

const SearchBarContainer = styled(Box)({
    display:'flex',
    marginBottom: '25px',
    marginTop:'20px'
});

const ModalButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
    gap:'50px',
    marginTop:'30px'
});

const ButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    gap:'40px',
    marginTop: '10px',
   // gap:'50px'
});


const EditButton = styled(Button)({
    backgroundColor: '#007bff',
    color: 'white',
    marginRight: '10px',
});

const DeleteButton = styled(Button)({
    backgroundColor: '#dc3545',
    color: 'white',
});

const StyledButton = styled(Button)({
   background: 'linear-gradient(45deg, #C004FF, #730399)',
    color: 'white',
});

const CancelButton = styled(Button)({
    background: 'linear-gradient(90deg, #4d4d4d, #b3b3b3)',
    color: 'white',
});

const textFieldStyles = {
    width: '100%',
    marginBottom: '20px',
    backgroundColor: 'white', // Fondo blanco para los inputs
    '& .MuiInputBase-input': {
      color: 'black', // Texto negro
      fontFamily: 'Nunito, sans-serif', // Aplicar tipografía Nunito
      fontWeight: 500, // Medium (peso 500)
      fontSize: '16px', // Tamaño de fuente 16px
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '5px', // Aquí aplicamos el border-radius por defecto
      '& fieldset': {
        border: '2px solid #ca99ef', // Sin borde por defecto
      },
      '&:hover fieldset': {
        border: '2px solid #ca99ef', // Borde transparente en hover
        borderImage: 'linear-gradient(45deg, #C004FF, #730399) 1', // Gradiente en hover
        borderRadius: '5px', // Aplicar border-radius en hover
      },
      '&.Mui-focused fieldset': {
        border: '2px solid #ca99ef', // Mantener borde cuando está enfocado
        borderImage: 'linear-gradient(45deg, #C004FF, #730399) 1', // Gradiente en foco
        borderRadius: '5px', // Mantener el border-radius cuando está enfocado
      },
    },
    '& .MuiInputLabel-root': {
      color: 'black', // Etiquetas en negro
      fontFamily: 'Nunito, sans-serif', // Aplicar tipografía Nunito
      fontWeight: 500, // Medium
      fontSize: '16px', // Tamaño de fuente 16px
    },
  };

  const CustomModal = styled(Box)(({ theme }) => ({
    width:'400px',
    //height:'50%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
   // width: 400,
    backgroundColor: 'white',
    padding: 20,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:'5px',
   // gap:'15px',
    
    // Estilos para diferentes tamaños de pantalla usando el theme
    [theme.breakpoints.up('md')]: {
     width:'30%',
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
     display:'flex',
     flexDirection:'column',
     alignItems:'center'
    },
  
  }));


  const CustomParagraph = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '20%', // Ensures it covers the full height of the viewport
    boxSizing: 'border-box',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    marginBottom:'100px',
    padding:'10px'

    
     }));

     const ComentTitle = styled(Typography)(({ theme }) => ({
        fontFamily: "Nunito",
        fontWeight: '600',
        color:'white',
        fontSize:'20px'
        
         }));

  const ComentParagraph = styled(Typography)(({ theme }) => ({
        fontFamily: "Nunito",
        fontWeight: '300',
        color:'white',
        fontSize:'16px',
        textAlign:'center'
        
         }));



import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  FormControl,
  TextField,
  Button,
  MenuItem,
  Container,
  Typography,
  Snackbar,
  Alert,
  styled,
} from "@mui/material";
import Swal from 'sweetalert2';  // Importar SweetAlert2
import { useUsersStore } from "../../../store/useUsersStore";
import AddActivity from "../../../Components/addActivity/AddActivity";
import { useActivitiesStore } from "../../../store/useActiviriesStore";
import rectangle51 from '../../../assests/imagenes/Rectangle51.png';
import { borderRadius, boxSizing, display, margin, padding, width } from "@mui/system";

const initialValues = {
  dni: "",
  nombre: "",
  fecha_nacimiento: "",
  telefono: "",
  mail: "",
  domicilio: "",
  rol: "",
  password: "",
};

const validate = (values) => {
  let errors = {};

  if (!values.dni) {
    errors.dni = "El campo es requerido";
  } else if (!/^[0-9]+$/.test(values.dni)) {
    errors.dni = "El campo debe contener solo números";
  }

  if (!values.nombre) {
    errors.nombre = "El campo es requerido";
  } else if (!/^[a-zA-ZñÑ\s]+$/.test(values.nombre)) {
    errors.nombre = "El campo debe contener solo letras";
  }

  if (!values.fecha_nacimiento) {
    errors.fecha_nacimiento = "El campo es requerido";
  } else if (!/^[0-9-]+$/.test(values.fecha_nacimiento)) {
    errors.fecha_nacimiento = "Formato esperado dd-mm-aaaa";
  }

  if (!values.telefono) {
    errors.telefono = "El campo es requerido";
  } else if (!/^[0-9]+$/.test(values.telefono)) {
    errors.telefono = "El campo solo admite números";
  }

  if (!values.mail) {
    errors.mail = "El campo es requerido";
  } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(values.mail)) {
    errors.mail = "El formato del correo electrónico no es válido";
  }

  if (!values.domicilio) {
    errors.domicilio = "El campo es requerido";
  } else if (!/^[A-Za-z0-9\s.,\-()#]+$/.test(values.domicilio)) {
    errors.domicilio = "Admite letras, numeros y espacios";
  }

  if (!values.rol) {
    errors.rol = "El campo es requerido";
  }

  if (!values.password) {
    errors.password = "El campo es requerido";
  }

  return errors;
};

// Función de manejo del envío del formulario con SweetAlert2
const handleSubmit = async (values, postUser, formik, selectedActivity, addActivity, setSelectedActivity) => {
  console.log(values);
  try {
    // Realiza la llamada al servidor
    const response = await postUser(values);
    const addedActivity = await addActivity(values.dni, selectedActivity);
    setSelectedActivity('');
    console.log(response);
    console.log(addedActivity);
    
 
    if (response && response.status === 200) { 
      Swal.fire({
        icon: 'success',
        title: 'Excelente !!!',
        text: 'El nuevo usuario ha sido creado exitosamente.',
      });
    } else {
      
      Swal.fire({
        icon: 'error',
        title: 'Ups... =(',
        text: 'Hubo un problema al crear el usuario. Inténtalo de nuevo.',
      });
    }
    formik.resetForm();
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un error inesperado. Inténtalo de nuevo más tarde.',
    });
  }
};


const NewUserForm = () => {
  const { postUser } = useUsersStore();
  const [selectedActivity , setSelectedActivity] = useState("");
  const {addActivity} = useActivitiesStore();

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      handleSubmit(values, postUser, formik,selectedActivity,addActivity,setSelectedActivity);
    },
    validate,
  });

  
  const handleActivityChange = (event) => {
    setSelectedActivity(event.target.value);
};

  return (
    <MainContainer >
      <CustomTitle>Nuevo usuario</CustomTitle>
      <ImageBacgroung>
      <form onSubmit={formik.handleSubmit}>
        <FormControl 
        sx={{
          width:'100%',
          height:'auto',
         
          
        }}>
          <FormContainer>
          <Box>
            <TextField
              label="Dni"
              name="dni"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dni}
              variant="outlined"
              sx={{...textFieldStyles,borderRadius:'5px'}}
            />
            <TextField
              label="Nombre"
              name="nombre"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombre}
              variant="outlined"
              sx={{...textFieldStyles,borderRadius:'5px'}}
            />
          </Box>
          <Box>
            <TextField
              label="Fecha Nacimiento"
              name="fecha_nacimiento"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fecha_nacimiento}
              variant="outlined"
              sx={{...textFieldStyles,borderRadius:'5px'}}
            />
            <TextField
              label="Telefono"
              name="telefono"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.telefono}
              variant="outlined"
              sx={{...textFieldStyles,borderRadius:'5px'}}
            />
          </Box>
          <Box>
            <TextField
              label="Mail"
              name="mail"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mail}
              variant="outlined"
              sx={{...textFieldStyles,borderRadius:'5px'}}
            />
            <TextField
              label="Domicilio"
              name="domicilio"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.domicilio}
              variant="outlined"
              sx={{...textFieldStyles,borderRadius:'5px'}}
            />
          </Box>
          <AddActivity selectedActivity={selectedActivity}  handleActivityChange={handleActivityChange} userDni = {formik.values.dni}/>
          <Box>
            <FormControl sx={{ width: '100%', marginTop:'20px' }}>
              <TextField
                select
                label="Rol"
                value={formik.values.rol}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="rol"
                variant="outlined"
                sx={{...textFieldStyles,borderRadius:'5px'}}
              >
                <MenuItem value={"Master"}>Master</MenuItem>
                <MenuItem value={"Cliente"}>Cliente</MenuItem>
              </TextField>
            </FormControl>

            <TextField
              type="password"
              label="Contraseña"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              variant="outlined"
              sx={{...textFieldStyles,borderRadius:'5px'}}
            />
          </Box>
          <Box>
            <Button
              type="submit"
              sx={{
                background: 'linear-gradient(45deg, #C004FF, #730399)',
                color: 'white',
                width: '100%',
                height: '60px',
                marginTop: '30px',
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '5px',
                cursor:'pointer',
                transition: 'background 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(45deg, #730399, #C004FF)',
                },
               // marginBottom:'30px',
              }}
            >
              Enviar
            </Button>
          </Box>
          </FormContainer>
         
         
        </FormControl>
      </form>
      <Paragraph>
              <ParagraphTitle>“La mejor herramienta para gestionar mi gimnasio”</ParagraphTitle>
              <ParagraphContent>Hace meses que uso esta app y realmente ha sido un antes y un después. Lo que más me gusta es la facilidad para gestionar las rutinas de mis clientes y llevar un control preciso de cada uno de ellos. ¡Definitivamente una herramienta indispensable para cualquier gimnasio que quiera crecer y ofrecer un servicio de calidad!</ParagraphContent>
              <UserName>— Carlos Gutiérrez, propietario de FitZone Gym</UserName>
      </Paragraph>
      </ImageBacgroung>
     
    </MainContainer>
  );
};

export default NewUserForm;

// Estilos
const MainContainer = styled(Box)(({ theme }) => ({
  width: '100vw', 
  height: 'auto',
  padding: '0',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'white',
  
  [theme.breakpoints.up('md')]: {
    width:'calc(100vw - 240px)',
    padding:'0px',
        marginLeft:'240px'
    
   
  },
}));

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
      border: 'none', // Sin borde por defecto
    },
    '&:hover fieldset': {
      border: '2px solid transparent', // Borde transparente en hover
      borderImage: 'linear-gradient(45deg, #C004FF, #730399) 1', // Gradiente en hover
      borderRadius: '5px', // Aplicar border-radius en hover
    },
    '&.Mui-focused fieldset': {
      border: '2px solid transparent', // Mantener borde cuando está enfocado
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


const CustomTitle = styled(Typography)(({}) => ({
    marginTop:'50px',
    fontFamily: "Nunito",
    fontWeight: '400',
    fontSize: '45px',
    color: 'black',
    textAlign: 'center',
    marginBottom:'30px',
    fontWeight: 'bold', 
}));

const FormContainer = styled(Box)(({theme}) => ({
  width:'100%',
  height:'auto',
  padding:'30px',
  boxSizing:'border-box',
 
  [theme.breakpoints.up('md')]: {
    width:'100%',
 
    
   
  }
}));

const ImageBacgroung = styled(Box)(({theme}) => ({
  width:'100%',
  height:'auto',
  boxSizing:'border-box',
  backgroundImage:`url(${rectangle51})`,
  backgroundSize: 'cover',
  boxSizing:'border-box',
  
 
  
  [theme.breakpoints.up('md')]: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    gap:'100px'
   
 
  }
 
}));

const Paragraph = styled(Box)(({ theme }) => ({
  display: 'none', // Oculto por defecto (en móviles)
  
  [theme.breakpoints.up('md')]: {
    display: 'flex', // Visible en pantallas medianas y más grandes (desktop)
    width: '400px',
    height: 'auto',
    flexDirection: 'column',
    width: '30%',
  }
}));

const ParagraphTitle = styled(Typography)(({theme}) => ({
  color:'white',
  fontFamily:'Nunito',
  fontWeight:'bold',
  fontSize:'30px',
  textAlign:'center'
  
}));

const ParagraphContent = styled(Typography)(({theme}) => ({
  width:'275px',
  height:'auto',
  color:'white',
  fontFamily:'Nunito',
  fontWeight:'300',
  fontSize:'20px',
  textAlign:'left',
  marginTop:'15px',
  marginBottom:'15px',
  marginLeft:'55px'
}));

const UserName = styled(Typography)(({theme}) => ({
  width:'450px',
  color:'white',
  fontFamily:'Nunito',
  fontSize:'20px',
  fontWeight:'medium',
}));


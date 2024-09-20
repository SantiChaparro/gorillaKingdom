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
    
    
    // Asegúrate de que la respuesta tenga un formato que indique éxito
    if (response && response.status === 200) { // Verifica el código de estado o estructura esperada
      Swal.fire({
        icon: 'success',
        title: 'Excelente !!!',
        text: 'El nuevo usuario ha sido creado exitosamente.',
      });
    } else {
      // Si la respuesta tiene un código de error o no es como se esperaba
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
    <MainContainer>
      <CustomTitle>Nuevo usuario</CustomTitle>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <Box>
            <TextField
              label="Dni"
              name="dni"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dni}
              variant="outlined"
              sx={textFieldStyles}
            />
            <TextField
              label="Nombre"
              name="nombre"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombre}
              variant="outlined"
              sx={textFieldStyles}
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
              sx={textFieldStyles}
            />
            <TextField
              label="Telefono"
              name="telefono"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.telefono}
              variant="outlined"
              sx={textFieldStyles}
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
              sx={textFieldStyles}
            />
            <TextField
              label="Domicilio"
              name="domicilio"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.domicilio}
              variant="outlined"
              sx={textFieldStyles}
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
                sx={textFieldStyles}
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
              sx={textFieldStyles}
            />
          </Box>
          <Box>
            <Button
              type="submit"
              sx={{
                backgroundColor: '#0028ff',
                color: 'white',
                width: '100%',
                height: '60px',
                marginTop: '50px',
                '&:hover': {
                  backgroundColor: '#0028ff', // Mantener el color azul en hover
                },
              }}
            >
              Enviar
            </Button>
          </Box>
        </FormControl>
      </form>
    </MainContainer>
  );
};

export default NewUserForm;

// Estilos
const MainContainer = styled(Container)(({ theme }) => ({
  width: '100vw',
  height: 'auto',
  padding: '15px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'black',
}));

const textFieldStyles = {
  width: '100%',
  marginBottom: '20px',
  '& .MuiInputBase-input': {
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
  '& .MuiInputLabel-root': {
    color: 'white',
  },
};

const CustomTitle = styled(Typography)(({}) => ({
    marginTop:'100px',
    fontFamily: "Bebas Neue",
    fontWeight: '400',
    fontSize: '3em',
    color: 'white',
    textAlign: 'center',
    marginBottom:'50px'
}));

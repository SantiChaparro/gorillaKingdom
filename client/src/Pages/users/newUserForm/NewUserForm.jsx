import React, {useState,useEffect} from "react";
import { useFormik } from "formik";
import {
  Box,
  FormControl,
  TextField,
  Button,
  Snackbar,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useUsersStore } from "../../../store/useUsersStore";




const initialValues = {
  dni: "",
  nombre: "",
  fecha_nacimiento: "",
  telefono: "",
  mail: "",
  domicilio: "",
  rol: "",
  password: ""
 
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

  if(!values.telefono){
    errors.telefono = "El campo es requerido";
  } else if(!/^[0-9]+$/.test(values.telefono)) {
    errors.telefono = "El campo solo admite números";
  }

  if (!values.mail) {
    errors.mail = "El campo es requerido";
  } else if (
    !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(values.mail)
  ) {
    errors.mail = "El formato del correo electrónico no es válido";
  }

  if(!values.domicilio){
    errors.domicilio = "El campo es requerido";
  } else if(!/^[A-Za-z0-9\s.,\-()#]+$/.test(values.domicilio)) {
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

const handleSubmit = async (values,postUser,formik) => {
  console.log(values);
  try {
    await postUser(values)
    formik.resetForm()
  } catch (error) {
    console.log(error)
  }

};


const NewUserForm = () => {

  const {postUser} = useUsersStore();

  const formik = useFormik({
    initialValues,
    onSubmit: async (values,{ resetForm }) => {
      // Llama a la función handleSubmit con los valores
      handleSubmit(values, postUser, formik);
    },
    validate,
  });


  

  return(
    <Container>
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
            />
            <TextField
              label="Nombre"
              name="nombre"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombre}
              variant="outlined"
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
            />
            <TextField
            label="Telefono"
            name="telefono"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.telefono}
            variant="outlined"
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
            />
            <TextField
            label="Domicilio"
            name="domicilio"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.domicilio}
            variant="outlined"
            />
          </Box>
          
          <Box>
            <FormControl>
              <TextField
              select
              label="Rol"
              value={formik.values.rol}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="rol"
              variant="outlined"
              >
                <MenuItem value={"Master"}>Master</MenuItem>
                <MenuItem value={"Cliente"}>Cliente</MenuItem>
              </TextField>
            </FormControl>
            
            <TextField
            type="password"
            label="Constraseña"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            variant="outlined"
            />
          </Box>
          <Box>
            <Button type="submit">Enviar</Button>
          </Box>
        </FormControl>
      </form>
    </Container>
  )

};

export default NewUserForm;
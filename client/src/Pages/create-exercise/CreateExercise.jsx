import React from "react";
import { useExercisesStore } from "../../store/useExercisesStore";
import { useFormik } from "formik";
import {
  Box,
  FormControl,
  TextField,
  Button,
  MenuItem,
  Typography,
  styled,
  FormHelperText,
} from "@mui/material";
import Swal from 'sweetalert2';

const initialValues = {
  nombre: "",
  grupo_muscular: "",
  descripcion: "",
};

const validate = (values) => {
  let errors = {};

  if (!values.nombre) {
    errors.nombre = "El campo es requerido";
  }

  if (!values.grupo_muscular) {
    errors.grupo_muscular = "El campo es requerido";
  }

  if (!values.descripcion) {
    errors.descripcion = "El campo es requerido";
  }

  return errors;
};

const handleSubmit = async (values, newExercise, resetForm) => {
  const { nombre, grupo_muscular, descripcion } = values;
  const exercise = newExercise(nombre, grupo_muscular, descripcion);
  resetForm();
  if(exercise){
    Swal.fire({
        icon: 'success',
        title: 'Excelente!',
        text: 'Ejercisio creado exitosamente.',
        showConfirmButton: true,
       // timer: 2000
    });
}else{
    Swal.fire({
        icon: 'error',
        title: 'Upss!',
        text: 'Hubo un problema, intenta de nuevo.',
        showConfirmButton: true,
       // timer: 2000
    });
}
};

const MainContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  padding: "15px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "black",
}));

const CustomTitle = styled(Typography)(({}) => ({
  fontFamily: "Bebas Neue",
  fontWeight: "400",
  fontSize: "3em",
  color: "white",
  marginBottom: "30px",
  marginTop:'100px'
}));


const textFieldStyles = {
  width: "100%", 
  marginBottom: "20px", 
  "& .MuiInputBase-input": {
    color: "white", 

  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "blue", 
    },
    "&:hover fieldset": {
      borderColor: "blue",
    },
    "&.Mui-focused fieldset": {
      borderColor: "blue", 
    },
  },
  "& .MuiInputLabel-root": {
    color: "white", 
  },
  "& .MuiSelect-select": {
    width: "100%", 
  },
  "& .MuiFormHelperText-root": {
    color: "white", 
  },
};

const CreateExercise = () => {
  const { newExercise } = useExercisesStore();

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values, newExercise, resetForm);
    },
    validate,
  });

  return (
    <MainContainer>
      <CustomTitle>Crear ejercicio</CustomTitle>
      <form style={{ marginTop: "100px" }} onSubmit={formik.handleSubmit}>
        <FormControl fullWidth>
          <Box>
            <TextField
              label="Nombre"
              name="nombre"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombre}
              variant="outlined"
              sx={textFieldStyles} 
              error={formik.touched.nombre && Boolean(formik.errors.nombre)}
              helperText={
                formik.touched.nombre && formik.errors.nombre ? (
                  <FormHelperText>{formik.errors.nombre}</FormHelperText>
                ) : ""
              }
            />
            <FormControl fullWidth sx={{ ...textFieldStyles, marginTop: "20px" }}>
              <TextField
                select
                label="Grupo muscular"
                value={formik.values.grupo_muscular}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="grupo_muscular"
                variant="outlined"
                sx={{ width: "100%" }}
                error={formik.touched.grupo_muscular && Boolean(formik.errors.grupo_muscular)}
                helperText={
                  formik.touched.grupo_muscular && formik.errors.grupo_muscular ? (
                    <FormHelperText>{formik.errors.grupo_muscular}</FormHelperText>
                  ) : ""
                }
              >
                <MenuItem value={"Pecho"}>Pecho</MenuItem>
                <MenuItem value={"Hombros"}>Hombros</MenuItem>
                <MenuItem value={"Brazos"}>Brazos</MenuItem>
                <MenuItem value={"Espalda"}>Espalda</MenuItem>
                <MenuItem value={"Core"}>Core</MenuItem>
                <MenuItem value={"Piernas"}>Piernas</MenuItem>
                <MenuItem value={"Gluteos"}>Gluteos</MenuItem>
              </TextField>
            </FormControl>
            <TextField
              label="Descripción del ejercicio"
              name="descripcion"
              value={formik.values.descripcion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              sx={{ ...textFieldStyles, marginTop: "20px" }}
              error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
              helperText={
                formik.touched.descripcion && formik.errors.descripcion ? (
                  <FormHelperText>{formik.errors.descripcion}</FormHelperText>
                ) : ""
              }
            />
        
          </Box>
          <Button
            type="submit"
            sx={{
              backgroundColor: "#0028ff",
              color: "white",
              width: "100%",
              height: "60px",
              marginTop: "20px",
              "&:hover": {
                backgroundColor: "#0028ff",
              },
            }}
          >
            Enviar
          </Button>
        </FormControl>
      </form>
    </MainContainer>
  );
};

export default CreateExercise;

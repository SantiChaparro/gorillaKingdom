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
import { border, boxSizing, display, height, maxWidth, padding, width } from "@mui/system";
import picture from '../../../src/assests/imagenes/createExercise.png'
import zIndex from "@mui/material/styles/zIndex";

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
  backgroundColor: "white",

  [theme.breakpoints.up('md')]: {
    width: 'calc(100vw - 240px)',
    height:'100vh',
    marginLeft: '240px',
    padding: '0',
    boxSizing:'border-box',
    

  },
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent:'space-between',
 
  [theme.breakpoints.up('md')]: {
    maxWidth: '100%',
    height:'100vh',
    padding: '0',
    boxSizing:'border-box',
    backgroundColor:'white',
 

  },
}));

const MainContentContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: 'flex-start',
 
  [theme.breakpoints.up('md')]: {
    maxWidth: '40%',
    height:'100%',
    padding: '10px',
    boxSizing:'border-box',
    backgroundColor:'white',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'

    
  },
}));

const LeftBox = styled(Box)(({ theme }) => ({
 display:'none',
 
  [theme.breakpoints.up('md')]: {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    width: '25%',
    height:'100%',
    boxSizing:'border-box',
    backgroundImage:`url(${picture})`,
    
    
  },
}));

const RightBox = styled(Box)(({ theme }) => ({
  display:'none',
  
   [theme.breakpoints.up('md')]: {
     display:'block',
     flexDirection:'column',
     alignItems:'center',
     justifyContent:'center',
     width: '25%',
     height:'100vh',
     backgroundImage:`url(${picture})`,
     boxSizing:'border-box',
    
 
     
   },
 }));

 const ParagraphContainer = styled(Box)(({ theme }) => ({
  display:'none',
  
   [theme.breakpoints.up('md')]: {
    width:'100%',
    height:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    boxSizing:'border-box',
    padding:'15px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Fondo con transparencia
    backdropFilter: 'blur(10px)', // Efecto de desenfoque
    borderRadius: '15px', // Bordes redondeados para un estilo más suave
    padding: '20px', // Espaciado interno
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Sombra suave para mayor cont
   // zIndex:1000,
   },
 }));


 const StyledForm = styled('form')(({ theme }) => ({
  maxWidth: '100%',
  marginTop: '100px', // Reducir el margen superior del formulario para vista móvil
  [theme.breakpoints.up('md')]: {
    maxWidth: '100%', 
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    marginTop: '50px', // Margen más amplio para pantallas grandes
  },
}));



const CustomTitle = styled(Typography)(({}) => ({
  fontFamily: "Nunito",
  fontWeight: "700",
  fontSize: "3em",
  color: "black",
  textAlign:'center',
   marginTop:'50px',
 
}));


const textFieldStyles = {
  width: "100%",
  marginBottom: "20px",
  "& .MuiInputBase-input": {
    color: "black", // Asegura que el texto sea visible
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "black", 
      //backgroundColor: 'white',
    },
    "&:hover fieldset": {
      borderColor: "violet",
    },
    "&.Mui-focused fieldset": {
      borderColor: "violet", 
    },
  },
  "& .MuiInputLabel-root": {
    color: "black", // Asegura que el label sea negro
  },
  "& .MuiFormHelperText-root": {
    color: "black", // Color del texto de ayuda
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
       
      <ContentContainer>
      <LeftBox>
      <ParagraphContainer>
        <Typography sx={{
          color:'black',
          fontFamily:'Nunito',
          fontSize:'30px',
          fontWeight:'700',
          textAlign:'center',
          lineHeight:0.8
          
          }}>Usa tu imaginación...</Typography>
          <Typography sx={{textAlign:'center',lineHeight:1.1, marginTop:'10px', fontFamily:'Nunito'}}>Crea ejercicios personalizados, que se ajusten a la necesidad de tus clientes.</Typography>
          <Typography sx={{marginTop:'50px', fontFamily:'Nunito',fontSize:'22px',fontWeight:'600',textAlign:'center'}}>"Personaliza cada movimiento, alcanza nuevas metas."</Typography>
      </ParagraphContainer>
     </LeftBox>
     <MainContentContainer>
     <CustomTitle>Crear ejercicio</CustomTitle>
     <StyledForm  onSubmit={formik.handleSubmit}>
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
            <FormControl fullWidth >
              <TextField
                select
                label="Grupo muscular"
                value={formik.values.grupo_muscular}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="grupo_muscular"
                variant="outlined"
                sx={textFieldStyles}
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
              sx={{ ...textFieldStyles }}
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
              background: 'linear-gradient(45deg, #C004FF, #730399)',
              color: "white",
              width: "100%",
              height: "60px",
              marginTop: "70px",
              "&:hover": {
                backgroundColor: "#0028ff",
              },
            }}
          >
            Crear  ejercicio
          </Button>
        </FormControl>
      </StyledForm>
     </MainContentContainer>
    
      <RightBox>
          <ParagraphContainer>
            <Typography>Simplemente...</Typography>
            <Typography>Elige un nombre para tu ejercicio.</Typography>
            <Typography>Asígnalo a un grupo muscular.</Typography>
            <Typography>Agrega una simple descripción.</Typography>
            <Typography>Presiona crear ejercicio y listo....</Typography>
          </ParagraphContainer>
      </RightBox>
      </ContentContainer>
     
    </MainContainer>
  );
};

export default CreateExercise;

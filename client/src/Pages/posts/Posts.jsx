import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, styled, Button } from '@mui/material';
import { usePostStore } from "../../store/usePostStore";
import { maxWidth } from "@mui/system";
import pluma1 from '../../../src/assests/imagenes/pluma1.jpg';
import pluma2 from '../../../src/assests/imagenes/pluma2.jpg';

const Posts = () => {
  const [fileArray, setFileArray] = useState([]);  // Estado para almacenar múltiples archivos
  const [titulo, setTitulo] = useState("");
  const [subTitulo, setSubTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");

  const { addPost, getPost, posts } = usePostStore();

  console.log(fileArray);
  

  const handleFile = (event) => {
    const files = Array.from(event.target.files);  // Convertir FileList a Array
    setFileArray([...fileArray, ...files]);  // Agregar los nuevos archivos al array existente
  };

  const handleUpload = async () => {
    const formData = new FormData();

    // Añadir los datos del post
    formData.append('titulo', titulo);
    formData.append('subTitulo', subTitulo);
    formData.append('cuerpo', cuerpo);

    // Añadir los archivos seleccionados al FormData
    if (fileArray.length > 0) {
      fileArray.forEach((file) => formData.append('multimedia', file));
    }

    await addPost(formData);

    // Limpiar los campos después de subir el post
    setTitulo("");
    setSubTitulo("");
    setCuerpo("");
    setFileArray([]);
    getPost()
  };

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <MainContainer>
      <CustomTitle sx={{ marginBottom: '25px',marginTop:'50px', fontSize:'3em',fontWeight:'700' }}>Posts</CustomTitle>
      <FormContainer>
        <CustomTitle sx={{ fontSize: '2em' }}>Titulo</CustomTitle>
        <TextField value={titulo} onChange={(e) => setTitulo(e.target.value)} sx={{ ...textFieldStyles }} />
        <CustomTitle sx={{ fontSize: '2em' }}>Subtitulo</CustomTitle>
        <TextField value={subTitulo} onChange={(e) => setSubTitulo(e.target.value)} sx={{ ...textFieldStyles }} />
        <CustomTitle sx={{ fontSize: '2em' }}>Cuerpo</CustomTitle>
        <TextField multiline minRows={5} value={cuerpo} onChange={(e) => setCuerpo(e.target.value)} sx={{ ...textFieldStyles,  }} />
        <CustomTitle sx={{ fontSize: '2em' }}>Carga de archivos</CustomTitle>
        <UploadLabel htmlFor="upload-button-file">
          Elegir archivos
        </UploadLabel>
        <input
          accept="image/*"
          id="upload-button-file"
          type="file"
          multiple
          onChange={handleFile}
          style={{ display: 'none' }}
        />
        <Button variant="contained" color="primary" onClick={handleUpload} disabled={fileArray.length === 0} style={{ marginTop: 16, width:'100%',height: '50px' ,background: 'linear-gradient(45deg, #C004FF, #730399)', width: '100%' }}>
          postear
        </Button>
      </FormContainer>
    </MainContainer>
  );
};

export default Posts;

// Estilos y componentes adicionales

const MainContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  maxHeight: "100vh",
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
    
  },
}));

const CustomTitle = styled(Typography)(({}) => ({
  fontFamily: "Nunito",
  fontWeight: "400",
  fontSize: "40px",
  color: "black",
  marginBottom: "1px",
  
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",

  [theme.breakpoints.up('md')]: {
    maxWidth:'40%',
    margin:'auto'
    
  },
}));

// const textFieldStyles = {
//   width: '100%',
//   marginBottom: '20px',
//   '& .MuiInputBase-input': {
//     color: 'white'
//   },
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       borderColor: 'blue',
//     },
//     '&:hover fieldset': {
//       borderColor: 'blue',
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: 'blue',
//     },
//   },
//   '& .MuiInputLabel-root': {
//     color: 'white',
//   }
// };

const UploadLabel = styled('label')({
 background: 'linear-gradient(45deg, #C004FF, #730399)',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'inline-block',
  fontSize: '1rem',
  fontFamily:'Nunito',
  marginTop: '10px',
  '&:hover': {
    backgroundColor: '#730399',
  },
});

const textFieldStyles = {
  width: '100%',
  marginBottom: '20px',
 backgroundColor: 'white',
 borderRadius: '5px',
  '& .MuiInputBase-input': {
      color: 'black',
      
  },
  '& .MuiOutlinedInput-root': {
      '& fieldset': {
          borderColor: 'black',
         // borderWidth: '2px',
      },
      '&:hover fieldset': {
          borderColor: '#C004FF',
          borderWidth: '2px',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#C004FF',
        borderWidth: '2px',
      },
  },
  '& .MuiInputLabel-root': {
      color: 'white',
  }
};
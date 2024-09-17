import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, styled, Button } from '@mui/material';
import { usePostStore } from "../../store/usePostStore";

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
      <CustomTitle sx={{ marginBottom: '50px',marginTop:'100px' }}>POSTS</CustomTitle>
      <FormContainer>
        <CustomTitle sx={{ fontSize: '2em' }}>Titulo</CustomTitle>
        <TextField value={titulo} onChange={(e) => setTitulo(e.target.value)} sx={{ ...textFieldStyles }} />
        <CustomTitle sx={{ fontSize: '2em' }}>subtitulo</CustomTitle>
        <TextField value={subTitulo} onChange={(e) => setSubTitulo(e.target.value)} sx={{ ...textFieldStyles }} />
        <CustomTitle sx={{ fontSize: '2em' }}>Cuerpo</CustomTitle>
        <TextField value={cuerpo} onChange={(e) => setCuerpo(e.target.value)} sx={{ ...textFieldStyles, height: '100px' }} />
        <CustomTitle sx={{ fontSize: '2em' }}>Carga de archivos</CustomTitle>
        <input accept="image/*" id="upload-button-file" type="file" multiple onChange={handleFile} />
        <Button variant="contained" color="primary" onClick={handleUpload} disabled={fileArray.length === 0} style={{ marginTop: 16, backgroundColor: 'blue', width: '100%' }}>
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
  marginBottom: "1px",
  
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "black",
}));

const textFieldStyles = {
  width: '100%',
  marginBottom: '20px',
  '& .MuiInputBase-input': {
    color: 'white'
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
  }
};

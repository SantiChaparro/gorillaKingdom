import React, { useEffect, useState } from "react";
import { Box, TextField, Typography, styled, Button } from '@mui/material';
import { useSectionStore } from "../../store/useSectionStore";
import AddBoxIcon from '@mui/icons-material/AddBox';

const Settings = () => {
  const {postSection,getSections,sections} = useSectionStore();
  const [titulo, setTitulo] = useState("");
  const [subTitulo, setSubTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [orden, setOrden] = useState("");
  const [imagen, setImagen] = useState([]);
  const [sectionStyle , setSectionStyle] = useState({
    titulo:{},
    subTitulo:{},
    cuerpo:{}
  });

  console.log(titulo);
  console.log(subTitulo);
  console.log(cuerpo);
  console.log(imagen);
  console.log(orden);
  console.log(sections);
  
  

  const handleTitulo = (event) => setTitulo(event.target.value);
  const handleSubTitulo = (event) => setSubTitulo(event.target.value);
  const handleCuerpo = (event) => setCuerpo(event.target.value);
  const handleOrden = (event) => setOrden(event.target.value);

  const handleImagen = (event) => {
    const files = Array.from(event.target.files);
    setImagen([...imagen, ...files]);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    // Añadir los datos del post
    formData.append('name', titulo);
    formData.append('titulo', titulo);
    formData.append('subTitulo', subTitulo);
    formData.append('cuerpo', cuerpo);
    formData.append('orden', orden);
    formData.append('sectionStyle',JSON.stringify(sectionStyle));

    // Añadir los archivos seleccionados al FormData
    if (imagen.length > 0) {
      imagen.forEach((file) => formData.append('multimedia', file));
    }

    await postSection(formData);

    // Limpiar los campos después de subir el post
    setTitulo("");
    setSubTitulo("");
    setCuerpo("");
    setImagen([]);
    
    getSections();
  };


  return (
    <MainContainer>
      <CustomTitle sx={{marginTop:'20px',marginTop:'100px', marginBottom:'30px'}}>ajustes</CustomTitle>

      <CustomTitle>TITULO</CustomTitle>
      <TextField
        value={titulo}
        onChange={handleTitulo}
        sx={textFieldStyles}
      />
      <CustomTitle>orden</CustomTitle>
      <TextField
        value={orden}
        onChange={handleOrden}
        sx={textFieldStyles}
      />

      <CustomTitle>SUBTITULO</CustomTitle>
      <TextField
        value={subTitulo}
        onChange={handleSubTitulo}
        sx={textFieldStyles}
      />

      <CustomTitle>CUERPO</CustomTitle>
      <TextField
        value={cuerpo}
        onChange={handleCuerpo}
        sx={{ ...textFieldStyles, height: '250px' }}
        multiline
        rows={10}
      />

      <CustomTitle sx={{ fontSize: '2em' }}>Carga de archivos</CustomTitle>

      <UploadContainer>
        <UploadLabel htmlFor="upload-button-file">
          Elegir archivos
        </UploadLabel>
        <input
          accept="image/*"
          id="upload-button-file"
          type="file"
          multiple
          name="multimedia"
          onChange={handleImagen}
          style={{ display: 'none' }}
        />
      </UploadContainer>
      <Button variant="contained" color="primary" onClick={handleUpload} disabled={imagen.length === 0} style={{ marginTop: 16, backgroundColor: 'blue', width: '100%' }}>
          postear
        </Button>
    </MainContainer>
  )
};

export default Settings;

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
  }
};

const UploadContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px',
  
}));

const UploadLabel = styled('label')(({ theme }) => ({
  fontFamily:'sans-serif',
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
  marginBottom:'20px'
}));

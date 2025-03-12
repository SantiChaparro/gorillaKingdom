import React, { useEffect, useState } from "react";
import { Box, TextField, Typography, styled, Button } from '@mui/material';
import { useSectionStore } from "../../store/useSectionStore";
import AddBoxIcon from '@mui/icons-material/AddBox';
import StylesEditor from "../../Components/stylesEditor/StylesEditor";
import FontSelector from "../../Components/fontSelector/FontSelector";
import FontSizeSelector from "../../Components/fontSizeSelector/FontSizeSelector";
import ColorPicker from "../../Components/colorPicker/ColorPiker";
import axios from "axios";

const Settings = () => {
  const { postSection, getSections, sections } = useSectionStore();
  const [name, setName] = useState("");
  const [titulo, setTitulo] = useState("");
  const [subTitulo, setSubTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [orden, setOrden] = useState("");
  const [imagen, setImagen] = useState([]);
  const [sectionStyle, setSectionStyle] = useState({
    titulo: {
      fontFamily: "",
      fontSize: "",
      color: "",
      aligment: ""
    },
    subTitulo: {
      fontFamily: "",
      fontSize: "",
      color: "",
      aligment: ""
    },
    cuerpo: {
      fontFamily: "",
      fontSize: "",
      color: "",
      aligment: ""
    }
  });
  const [fontEditing, setFontEditing] = useState(false);
  const [fontSizeEditing , setFontSizeEditing] = useState(false);
  const [colorEditing , setColorediting] = useState(false);
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState(null);
  const [selectedFontSize , setSelectedFontSize] = useState(null);
  const [color , setColor] = useState("");

  console.log(sectionStyle);
  console.log(sections);
  console.log(fontSizeEditing);
  console.log(selectedFontSize);
  console.log(colorEditing);
  console.log(color);
  
  
  
  
  

  useEffect(() => {
    if (selectedFont) {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${selectedFont.value.replace(' ', '+')}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      // Limpieza: elimina el enlace cuando la fuente cambia o se desmonta el componente
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [selectedFont]);

  console.log(sectionStyle);
  console.log(fonts);


  // Función para actualizar el estado al hacer foco en otro input
  const handleFocus = (field) => {
    if (field !== 'orden') { // Excluir el campo orden de la función
      handleStyleChange(field, { 
        fontFamily: selectedFont?.value,
        fontSize: selectedFontSize?.value || sectionStyle[field]?.fontSize,  
        color: color
      });
    }
  };

  const handleName = (event) => setName(event.target.value);
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
    formData.append('name', name);
    formData.append('titulo', titulo);
    formData.append('subTitulo', subTitulo);
    formData.append('cuerpo', cuerpo);
    formData.append('orden', orden);
    formData.append('sectionStyle', JSON.stringify(sectionStyle));

    // Añadir los archivos seleccionados al FormData
    if (imagen.length > 0) {
      imagen.forEach((file) => formData.append('multimedia', file));
    }

    await postSection(formData);

    setTitulo("");
    setSubTitulo("");
    setCuerpo("");
    setImagen([]);


    // Limpiar los campos después de subir el post
    getSections();
  };

  const fontKey = 'AIzaSyCyYOAM__29rPzT3IyuQsx4CoqI_P1pGCs'; //clave publica para hacer fetch de las fuentes
  const fetchFonts = async () => {
    const response = await axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${fontKey}`)
    setFonts(response.data.items);
  };

  useEffect(() => {
    fetchFonts();
  }, [])

  const handleStyleChange = (field, newStyles) => {
    setSectionStyle(prev => ({
      ...prev,
      [field]: {
        fontFamily: prev[field].fontFamily || "", // Asegúrate de que no se convierta en undefined
        fontSize: prev[field].fontSize || "",
        color: prev[field].color || "",
        aligment: prev[field].aligment || "",
        ...newStyles // Actualiza solo las propiedades que cambian
      }
    }));
  };

  return (
    <MainContainer>
      <CustomTitle sx={{ marginTop: '20px', marginTop: '100px', marginBottom: '30px' }}>ajustes</CustomTitle>

   
      <StylesEditor setSectionStyle={setSectionStyle} setFontEditing={setFontEditing} fontEditing={fontEditing} fontSizeEditing={fontSizeEditing} setFontSizeEditing={setFontSizeEditing} setColorediting={setColorediting} colorEditing={colorEditing} />
      {fontEditing && <FontSelector fonts={fonts} selectedFont={selectedFont} setSelectedFont={setSelectedFont} />}
      {fontSizeEditing && <FontSizeSelector selectedFontSize={selectedFontSize} setSelectedFontSize={setSelectedFontSize} />}
      {colorEditing && <ColorPicker color={color} setColor={setColor}/>}


      <CustomTitle>Nombre secccion</CustomTitle>
      <TextField
        value={name}
        onChange={handleName}
       
        sx={{
          ...textFieldStyles,
        
        }}
      />
         <CustomTitle>TITULO</CustomTitle>

      <TextField
        value={titulo}
        onChange={handleTitulo}
        onFocus={() => handleFocus('titulo')} // Actualiza el estado al hacer foco
        sx={{
          ...textFieldStyles,
          '& .MuiInputBase-input': {
            fontFamily: sectionStyle.titulo.fontFamily,
            color: sectionStyle.titulo.color || 'white',
          },
        }}
      />

      <CustomTitle>orden</CustomTitle>
      <TextField
        value={orden}
        onChange={handleOrden}
        onFocus={() => handleFocus('orden')} // Actualiza el estado al hacer foco
        sx={{
          ...textFieldStyles,
          '& .MuiInputBase-input': {

            color: 'white',
          },
        }}
      />

      <CustomTitle>SUBTITULO</CustomTitle>
      <TextField
        value={subTitulo}
        onChange={handleSubTitulo}
        onFocus={() => handleFocus('subTitulo')} // Actualiza el estado al hacer foco
        sx={{
          ...textFieldStyles,
          '& .MuiInputBase-input': {
            fontFamily: sectionStyle.subTitulo.fontFamily,
            color: sectionStyle.subTitulo.color || 'white',
          },
        }}
      />

      <CustomTitle>CUERPO</CustomTitle>
      <TextField
        value={cuerpo}
        onChange={handleCuerpo}
        onFocus={() => handleFocus('cuerpo')}// Actualiza el estado al hacer foco
        sx={{
          ...textFieldStyles,
          '& .MuiInputBase-input': {
            fontFamily: sectionStyle.cuerpo.fontFamily,
            color: sectionStyle.cuerpo.color || 'white',
          },
        }}
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

const CustomTitle = styled(Typography)(({ }) => ({
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
  fontFamily: 'sans-serif',
  backgroundColor: 'blue',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: '#0056b3',
  },
  marginBottom: '20px'
}));

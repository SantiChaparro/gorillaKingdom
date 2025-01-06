import React, { useEffect, useState } from 'react';
import UserNavBar from '../../../Components/UserNavBar';
import { Box, styled, Typography } from '@mui/material';
import {jwtDecode} from 'jwt-decode';  // jwtDecode no necesita destructuring
import Cookies from 'js-cookie';  // Importa js-cookie
import { usePostStore } from '../../../store/usePostStore';
import { useSectionStore } from '../../../store/useSectionStore';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; 
import Loader from '../../../Components/loader/Loader';  // Asegúrate de que el componente loader esté en mayúsculas
import { boxSizing, fontSize, height, textAlign } from '@mui/system';

const UserDashBoard = ({ handleMenuClick, onClose, opendrawer, verifiedUser, setVerifiedUser }) => {
   const { getPost, posts } = usePostStore();
   const { getSections, sections } = useSectionStore();
   const [loading, setLoading] = useState(true);
   const [orderedSections, setOrderedSections] = useState([]);
   const [selectedFont, setSelectedFont] = useState([]); // Estado para la fuente seleccionada
   const [selectedFontSize, setSelectedFontSize] = useState([]);
   console.log(posts);
   console.log(sections);
   console.log(orderedSections);
   console.log(selectedFont);
   console.log(selectedFontSize);
   
   
   
   
  useEffect(() => {
    getPost();
    getSections();
  }, []);

  useEffect(() => {
    if (posts.length > 0 || sections.length > 0) {
      setLoading(false);
    }
  }, [posts]);

  useEffect(() => {
    handleSections();
  }, [sections]);

  useEffect(() => {
    const token = Cookies.get('token'); 
    console.log(token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const currentTime = Date.now() / 1000;  // Obtener la hora actual en formato UNIX
        if (decodedToken.exp > currentTime) {   // Comparar con el tiempo de expiración
          setVerifiedUser(decodedToken.user);  // Establecer el usuario verificado
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        Cookies.remove('token');  // Remover el token si es inválido
      }
    }
  }, [setVerifiedUser]);

  const handleSections = () => {
    if (sections && sections.length > 0) {
      const sortedSections = sections
        .sort((a, b) => a.settings[0].orden - b.settings[0].orden) // Ordena por settings[0].orden
        .map(section => {
          const updatedSettings = section.settings.map(setting => {
            let parsedStyle = {};
  
            try {
              // Verifica si sectionStyle es un string y lo parsea
              if (typeof setting.sectionStyle === 'string') {
                parsedStyle = JSON.parse(setting.sectionStyle); 
                console.log("sectionStyle parseado:", parsedStyle);
              }
            } catch (e) {
              console.error("Error parsing sectionStyle:", e);
            }
  
            // Recoge los estilos de parsedStyle
            const fontsToLoad = [];
            const sizesToLoad = [];
            const colorsToLoad = [];
            for (const style of Object.values(parsedStyle)) {
              if (style.fontFamily && !fontsToLoad.includes(style.fontFamily)) {
                fontsToLoad.push(style.fontFamily);
              }
              if (style.fontSize && !sizesToLoad.includes(style.fontSize)) {
                sizesToLoad.push(style.fontSize);
              }
              if (style.color && !colorsToLoad.includes(style.color)) {
                colorsToLoad.push(style.color);
              }
            }
  
            // Actualiza los estados globales o locales
            setSelectedFont(prevFonts => [...new Set([...prevFonts, ...fontsToLoad])]);
            setSelectedFontSize(prevSizes => [...new Set([...prevSizes, ...sizesToLoad])]);
  
            // Retorna cada setting con el sectionStyle parseado
            return {
              ...setting,
              sectionStyle: parsedStyle // Reemplaza sectionStyle con el objeto parseado
            };
          });
  
          // Retorna la sección con el array de settings actualizado
          return {
            ...section,
            settings: updatedSettings // Actualiza todos los settings en la sección
          };
        });
  
      setOrderedSections(sortedSections); // Guarda las secciones ordenadas y con estilos parseados
    }
  };
  

  useEffect(() => {
    selectedFont.forEach(font => {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${font.replace(' ', '+')}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    });
  }, [selectedFont]);

  return (
    <MainContainer>
      <UserNavBar handleMenuClick={handleMenuClick} opendrawer={opendrawer} />
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ color: 'black', marginTop: '100px', marginBottom: '50px', fontFamily: 'nunito', fontWeight: '600', fontSize: '25px' }}>
          {`bienveni@ ${verifiedUser?.nombre}`}
        </Typography>
      </Box>

      {loading ? (
        <Loader />  // Asegúrate de que el componente loader esté en mayúsculas
      ) : (
        sections.length > 0 && orderedSections.map((section, sectionIndex) => (
          <SectionBox id={`${section.id}`} key={section.id}>
            <SectionName>{`${section.name}`}</SectionName>
            <SectionContainer>
            {section.settings.map((setting, index) => (
             
              <SectionContentContainer key={index}>
                <SectionTextContainer>
                <Typography 
                    sx={{
                      width: '100%',
                      color: setting.sectionStyle?.titulo?.color || 'black',
                      fontFamily: selectedFont.includes(section.sectionStyle?.titulo?.fontFamily) 
                        ? setting.sectionStyle?.titulo?.fontFamily 
                        : 'nunito',
                      fontSize: {
                        xs: '18px',  // Tamaño de fuente para pantallas pequeñas
                        sm: setting.sectionStyle?.titulo?.fontSize || '24px',
                        md:   '30px'
                      },
                      textAlign:'center',
                    }} 
                   // variant="h5"
                  >
                    {setting.titulo || 'Default Titulo'}
                  </Typography>
                {/* Renderizamos el subtitulo */}
                <Typography sx={{
                  width: '100%',
                  color: setting.sectionStyle?.subTitulo?.color || 'black',
                  fontFamily: setting.sectionStyle?.subTitulo?.fontFamily || 'nunito',
                  fontSize: setting.sectionStyle?.subTitulo?.fontSize || '24px',
                }}>{setting.subTitulo || 'Default Subtitulo'}</Typography>
        
                <br />
        
                {/* Renderizamos el cuerpo */}
                <Typography sx={{
                  width: '100%',
                  color: setting.sectionStyle?.cuerpo?.color || 'black',
                  fontFamily: setting.sectionStyle?.cuerpo?.fontFamily || 'nunito',
                  fontSize: setting.sectionStyle?.cuerpo?.fontSize || '24px',
                }}>{setting.cuerpo || 'Default Cuerpo'}</Typography>
                  </SectionTextContainer>
                {/* Renderizamos las imágenes */}
                <MultimediaContainer>
                  {setting.imagenes?.map((url, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={url}
                      alt={`multimedia-${imageIndex}`}
                      style={{ width: '100%', borderRadius:'10px' }}
                    />
                  ))}
                </MultimediaContainer>
              </SectionContentContainer>
             
            ))}
            </SectionContainer>
          </SectionBox>
        ))
        
      )}

      <Box>
        {posts.map((post) => (
          <PostContainer key={post.id}>
            <TextContainer>
              <Title variant="h6">{post.titulo}</Title>
              <Typography sx={{ textAlign: 'center', fontSize: '18px', marginBottom: '15px', marginTop: '5px' }} variant="subtitle1">{post.subTitulo}</Typography>
              <Typography sx={{ textAlign: 'center' }} variant="body1">{post.cuerpo}</Typography>
            </TextContainer>

            <MultimediaContainer>
              {post.multimedia.length > 1 ? (
                <ImageGallery
                  items={post.multimedia.map(image => ({
                    original: image.replace('upload', '/upload/w_600,h_400,c_fill/'),
                    thumbnail: image.replace('/upload/', '/upload/w_150,h_150,c_fill/')
                  }))}
                  showBullets={true}
                  showThumbnails={false}
                />
              ) : (
                <img
                  src={post.multimedia[0]}
                  alt="single image"
                  style={{ width: '100%' }}
                />
              )}
            </MultimediaContainer>
          </PostContainer>
        ))}
      </Box>
    </MainContainer>
  );
};

export default UserDashBoard;


const MainContainer = styled(Box)(({ theme }) => ({
  margin: 0,
  padding: '15px',
  width: '100%',
  minHeight:'100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  overflow: 'hidden',
  boxSizing:'border-box',

  [theme.breakpoints.up('md')]: {
    maxWidth: "100%",
    minheight: "100vh",
    padding:'0 120px'
    
  },
}));

const MultimediaContainer = styled(Box)(({ theme }) => ({
  margin: 0,
  width: '100%',
  height:'auto',
  display: 'flex',
  alignItems:'center',
  justifyContent:'center',
  //marginTop:'25px',
  borderRadius:'10px',
 // overflowY:'hidden',
  boxSizing:'border-box',
 boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.5)',

  [theme.breakpoints.up('md')]: {
    width: "50%",
    height: "100%",
    //boxSizing:'border-box',
   
    justifyContent:'center',
    border:'1px solid red'
    

  },
  img: {
    width: '100%',         // La imagen ocupa el 100% del ancho del contenedor
    height: '100%',        // Ajusta la altura automáticamente para mantener la proporción
    maxWidth: '100%',      // Asegura que no exceda el tamaño del contenedor
    borderRadius: '10px',  // Mantiene los bordes redondeados
    objectFit: 'contain',  // Asegura que la imagen completa esté visible sin recortarse
    overflow: 'hidden',    // Evita que el contenido se salga
  },
}));

const TextContainer = styled(Box)(({ theme }) => ({
 
  width: '100%',
  height:'auto',
  display: 'flex',
  flexDirection:'column',
 
  boxSizing:'border-box',
   [theme.breakpoints.up('md')]: {
    width: '50%',  
    height:'auto',
    
    
  },
}));

const SectionTextContainer = styled(Box)(({ theme }) => ({
 
  width: '100%',
  height:'auto',
  display: 'flex',
  flexDirection:'column',
  alignItems:'center',
  
  boxSizing:'border-box',

  [theme.breakpoints.up('md')]: {
    width: '50%',  
    height:'auto',
    border:'1px solid red'
    
    
  },

}));

const SectionContainer = styled(Box)(({ theme }) => ({
 
  width: '100%',
  height:'auto',
  display: 'flex',
  flexDirection:'column',
 
  boxSizing:'border-box',

  [theme.breakpoints.up('md')]: {
    width: '100%',  
    height:'auto',
    flexDirection:'row',
    alignItems:'center',
   border:'1px solid black',
   

    
    
  },

}));


const SectionContentContainer = styled(Box)(({ theme }) => ({
 
  width: '100%',
  height:'auto',
  display: 'flex',
  flexDirection:'column',
 
  boxSizing:'border-box',

  [theme.breakpoints.up('md')]: {
    width: '50%',  
    height:'100%',
    flexDirection:'row',
    border:'1px solid green'
    
    
  },

}));

const Title = styled(Typography)(({ theme }) => ({
  width:'100%',
  textAlign:'center',
  color:'black',
  fontFamily:'nunito',
  fontSize:'25px',
  fontWeight:'500px',
  boxSizing:'border-box',
  textDecorationLine: 'underline',  // Aplica el subrayado
  textDecorationColor: '#C004FF',     // Color del subrayado (puedes cambiar el color aquí)
  textDecorationThickness: '2px',
  textUnderlineOffset: '8px', 

rginBottom:'20px'
}));

const PostContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '30px',
  padding: '10px',
  border: '1px solid #E0E0E0',  // Un borde más sutil
  borderRadius: '15px',
  backgroundColor: '#FAFAFA',  // Un fondo suave
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Sombra suave para dar elevación
  transition: 'transform 0.3s, box-shadow 0.3s',  // Animaciones suaves
  boxSizing:'border-box',
  
  // Efecto hover
  '&:hover': {
    transform: 'translateY(-5px)',  // Eleva el post al pasar el cursor
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',  // Sombra más fuerte en hover
  },

  [theme.breakpoints.up('md')]: {
    width: '80%',  
    justifyContent:'center',
    margin:'auto'
    
  },
}));

const SectionBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height:'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom:'30px',
  padding: '10px',
  border: '1px solid #E0E0E0',  // Un borde más sutil
  borderRadius: '15px',
  // backgroundColor: '#FAFAFA',  // Un fondo suave
  // boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Sombra suave para dar elevación
  // transition: 'transform 0.3s, box-shadow 0.3s',  // Animaciones suaves
   boxSizing:'border-box',
  


  [theme.breakpoints.up('md')]: {
    width: '100%',  
    
    
  },
}));

const SectionName = styled(Box)(({ theme }) => ({
  margin: 0,
  width: '100%',
  fontFamily:'Nunito',
  fontSize:'25px',
  fontWeight:'600',
  textAlign:'center',
  marginBottom:'30px',

  [theme.breakpoints.up('md')]: {
    maxWidth: "100%",
    textAlign:'left',
    fontSize:'40px',
    textDecorationLine: 'underline',  // Aplica el subrayado
  textDecorationColor: '#C004FF',     // Color del subrayado (puedes cambiar el color aquí)
  textDecorationThickness: '2px',
  textUnderlineOffset: '8px', 
  marginBottom:'60px'
   
  },
}));


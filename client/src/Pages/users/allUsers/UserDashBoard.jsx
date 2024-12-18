import React, { useEffect, useState } from 'react';
import UserNavBar from '../../../Components/UserNavBar';
import { Box, styled, Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';  // Importa js-cookie
import { usePostStore } from '../../../store/usePostStore';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.css';
// import  Navigation  from 'swiper'; // Asegúrate de importar Navigation correctamente
// import ImageCarousel from '../../../Components/carrusel/Carrusel';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; 
import loader from '../../../Components/loader/Loader';

const UserDashBoard = ({ handleMenuClick, onClose, opendrawer, verifiedUser,setVerifiedUser }) => {
   const { getPost, posts } = usePostStore();
   const [loading, setLoading] = useState(true);
   console.log(posts);
   
  useEffect(()=>{
    getPost();
  },[])

  useEffect(()=>{
    if(posts.length > 0){
      setLoading(false)
    }
  },[posts])

  useEffect(() => {
    if (verifiedUser) {
      console.log(verifiedUser);
    } else {
      console.log("cargando....");
    }


  }, [verifiedUser])

  useEffect(() => {
    const token = Cookies.get('token'); 
    console.log(token);
     // Obtener la cookie del token si existe
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
              // Decodificar el token
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


  return (
    <MainContainer>
      <UserNavBar handleMenuClick={handleMenuClick} opendrawer={opendrawer} />
      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ color: 'black', marginTop: '100px', marginBottom: '50px', fontFamily: 'nunito', fontWeight: '600', fontSize: '25px' }}>
          {`bienveni@ ${verifiedUser?.nombre}`}
        </Typography>
      </Box>

      {loading ? (
        <loader />  // Muestra el loader mientras los datos se están cargando
      ) : (
        <Box>
          {posts.map((post) => (
            <PostContainer key={post.id}>
              <TextContainer>
                <Title variant="h6">{post.titulo}</Title>
                <Typography sx={{textAlign:'center',fontSize:'18px', marginBottom:'15px',marginTop:'5px'}} variant="subtitle1">{post.subTitulo}</Typography>
                <Typography sx={{textAlign:'center'}} variant="body1">{post.cuerpo}</Typography>
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
                    style={{  width: '100%'}}
                  />
                )}
              </MultimediaContainer>
            </PostContainer>
          ))}
        </Box>
      )}
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
    
  },
}));

const MultimediaContainer = styled(Box)(({ theme }) => ({
  margin: 0,
  width: '100%',
  height:'auto',
  display: 'flex',
  alignItems:'center',
  justifyContent:'center',
  marginTop:'25px',
  borderRadius:'10px',
  overflowY:'hidden',
  boxSizing:'border-box',
 // boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.5)',

  [theme.breakpoints.up('md')]: {
    width: "30%",
    height: "40%",
    //boxSizing:'border-box',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
    

  },
}));

const TextContainer = styled(Box)(({ theme }) => ({
 
  width: '100%',
  height:'auto',
  display: 'flex',
  flexDirection:'column',
 
  boxSizing:'border-box'
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
  //marginBottom:'20px'
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



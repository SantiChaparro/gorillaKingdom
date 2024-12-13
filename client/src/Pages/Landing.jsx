import React, { useEffect, useState } from "react";
import { Box, Button, Card, TextField, Typography, styled } from '@mui/material';
import NavBar from "../Components/NavBar/NavBar";
//import Footer from "../Components/Footer/Footer";
import { usePostStore } from "../store/usePostStore";
import { useSectionStore } from "../store/useSectionStore";
import LogginForm from "../Components/logginForm/LogginForm";
import Swal from "sweetalert2";
import { border, borderRadius, boxSizing, height, keys, padding, textAlign, width } from "@mui/system";
import LandingDrawer from "../Components/landingDrawer/LandingDrawer";
import heroImage from '../../src/assests/imagenes/heroimage.png';
import aboutPicture from '../../src/assests/imagenes/about.png'
import featurePicture from '../../src/assests/imagenes/featurespicture1.png';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {SiAssignmentDuotone,FluentMdl2Chart,ClarityBoltLine} from '../assests/icons/icons';
import contactImage from '../../src/assests/imagenes/contactForm.png';
import ContactForm from '../Components/addActivity/ContactForm';
import { useNavigate } from "react-router-dom";
import { useLogginStore } from "../store/useLogginStore";
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie'; 


const Landing = ({ setVerifiedUser,verifiedUser,setOpenLandingDrawer,hanldeCloseDrawer,}) => {
    const { getPost, posts } = usePostStore();
    const { getSections, sections } = useSectionStore();
    const [orderedSections, setOrderedSections] = useState([]);
  //  const [loggin, setLoggin] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedFont, setSelectedFont] = useState([]); // Estado para la fuente seleccionada
    const [selectedFontSize, setSelectedFontSize] = useState([]);
     const [openDrawer, setOpendrawer] = useState(false);
     const {LogginFormOpen,logginResponse} = useLogginStore()

    const navigate = useNavigate();
    console.log('desde la landing',verifiedUser);
    
    
    const navigateToFeatures = () => {
        navigate('/features');
    };

    // const hanldeCloseDrawer = () => {
    //     setOpendrawer(false)
    // };

//    const handleSections = () => {
//     if (sections && sections.length > 0) {
//         const sortedSections = sections
//             .sort((a, b) => a.settings.orden - b.settings.orden)
//             .map(section => {
//                 let parsedStyle = {};
//                 try {
//                     // Parsear el estilo de la sección
//                     if (typeof section.settings.sectionStyle === 'string') {
//                         parsedStyle = JSON.parse(section.settings.sectionStyle);
//                     }
//                 } catch (e) {
//                     console.error("Error parsing sectionStyle:", e);
//                 }

//                 // Recopilar fuentes y tamaños de fuente para cargar
//                 const fontsToLoad = [];
//                 const sizesToLoad = [];
//                 const colorsToLoad = [];
//                 for (const style of Object.values(parsedStyle)) {
//                     if (style.fontFamily && !fontsToLoad.includes(style.fontFamily)) {
//                         fontsToLoad.push(style.fontFamily);
//                     }
//                     if (style.fontSize && !sizesToLoad.includes(style.fontSize)) {
//                         sizesToLoad.push(style.fontSize); // Aquí capturas el tamaño de la fuente
//                     }
//                     if (style.color && !colorsToLoad.includes(style.color)) {
//                         colorsToLoad.push(style.color);
//                     }
//                 }

//                 // Actualizar los estados para las fuentes y tamaños seleccionados
//                 setSelectedFont(prevFonts => [...new Set([...prevFonts, ...fontsToLoad])]);
//                 setSelectedFontSize(prevSizes => [...new Set([...prevSizes, ...sizesToLoad])]);

//                 return {
//                     ...section,
//                     sectionStyle: parsedStyle // Asegurarte de que los estilos estén bien parseados
//                 };
//             });
//         setOrderedSections(sortedSections);
//     }
// };
// useEffect(() => {
//     selectedFont.forEach(font => {
//         const link = document.createElement('link');
//         link.href = `https://fonts.googleapis.com/css2?family=${font.replace(' ', '+')}&display=swap`;
//         link.rel = 'stylesheet';
//         document.head.appendChild(link);

//         // Limpieza: elimina el enlace cuando la fuente cambia o se desmonta el componente
//         return () => {
//             document.head.removeChild(link);
//         };
//     });
// }, [selectedFont]);


    // useEffect(() => {
    //     getSections();
    //     getPost();
    // }, [getSections, getPost]);

    // useEffect(() => {
    //     handleSections();
    // }, [sections]);

    // // Show SweetAlert when message changes
    useEffect(() => {
        if (message) {
            Swal.fire({
                title: 'Error',
                text: message,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                setMessage(""); // Reset the message
            });
        }
    }, [message]);

    // Suponiendo que este `useEffect` se encuentra en la Landing Page o un componente principal
useEffect(() => {
    if (logginResponse && logginResponse.token) {
        const token = logginResponse.token;
        const decodedToken = jwtDecode(token);
        Cookies.set('token', token, { expires: 1 }); // Guarda la cookie por 1 día
    
        if (logginResponse.user) {
            setVerifiedUser(logginResponse.user);
    
            if (decodedToken.rol === "Master") {
                navigate("/master");
            } else {
                navigate("/usuario");
            }
        } else {
            setMessage(logginResponse.successMessage);  // Mostrar mensaje si no hay usuario
        }
    }
}, [logginResponse, navigate, setVerifiedUser, setMessage]); // Asegúrate de que las dependencias estén correctas


    return (
        <LandingMainContainer>
            <NavBar  setOpendrawer={setOpendrawer} />
            {openDrawer && <LandingDrawer open={openDrawer} close={hanldeCloseDrawer} sections={sections} />} {/* Renderizado condicional del Drawer */}
            {LogginFormOpen && (
                <LogginFormOverlay>
                    <LogginForm  setVerifiedUser={setVerifiedUser} setMessage={setMessage} />
                </LogginFormOverlay>
            )}
            <HeroContainer>
                <HeroLeftContainer>
                    <HeroTextContainer>
                        <HeroTitle >Gestionar tu negocio jamas fue tan facil.</HeroTitle>
                        <HeroSubTitle>simplifica tareas, multiplica resultados.</HeroSubTitle>
                    </HeroTextContainer>
                    <CustomButtom>Registrate ahora</CustomButtom>
                </HeroLeftContainer>
                <HeroRightContainer>
                    
                </HeroRightContainer>
            </HeroContainer>
            <AboutUsContainer>
                    <AboutUsLeft>
                        <SubTitle >
                        Un poco más sobre nosotros.
                        </SubTitle>
                        
                        <Paragraph >
                        En Gympall, entendemos las necesidades de los propietarios de gimnasios modernos que buscan ofrecer experiencias de entrenamiento de alta calidad y mantener a sus miembros comprometidos. Nuestra plataforma ha sido diseñada específicamente para ayudar a dueños de gimnasios a gestionar de manera eficiente su negocio, mejorando la organización y maximizando el valor que ofrecen a sus clientes.
                        </Paragraph>
                        
                        <Paragraph >
                        Gympall permite a los gimnasios crear y personalizar rutinas de entrenamiento para sus miembros, brindando un servicio más cercano y adaptado a las necesidades individuales de cada usuario. Con nuestra aplicación, los entrenadores pueden gestionar rutinas, crear ejercicios y monitorear el progreso de cada persona, todo desde una interfaz intuitiva y fácil de usar.
                        </Paragraph>
                    </AboutUsLeft>
                    <AboutUsRight>
                        
                    </AboutUsRight>    
            </AboutUsContainer>
            <FeaturesContainer>
                <UpFeaturesContainer>
                <UpFeaturesText>
                    <FeatureContent >
                    <SubTitle >Nuestro aporte</SubTitle>
                            <Paragraph sx={{width:{lg:'80%'}}}>Aqui podrás ver algunas de las funcionalidades que harán tu día a día más fácil.
                            Nuestra misión es apoyarte y hacer de tu trabajo una experiencia única. </Paragraph>
                    </FeatureContent>
                           <CustomButtom onClick={navigateToFeatures}>VER MAS</CustomButtom>
                        </UpFeaturesText>
                        <UpFeaturesPicture>

                        </UpFeaturesPicture>
                       
                </UpFeaturesContainer>
                <DownFeaturesContainer>
                        <CardContainer elevation={0}>
                        <SiAssignmentDuotone width="60" height="60" color="rgba(255, 255, 255, 0.85)" />
                           
                            <Typography sx={{fontSize:'20px', color: 'white', textAlign:'center'}}>
                            Lleva un registro detallado de tus clientes, su progreso y pagos
                            </Typography>
                        </CardContainer>
                        <CardContainer elevation={0}>
                            <FluentMdl2Chart width="60" height="60" color="rgba(255, 255, 255, 0.85)"/>
                            <Typography sx={{fontSize:'20px', color: 'white', textAlign:'center'}}>
                            Permite a tus clientes visualizar su rutina, modificar sus cargas y ver su progreso
                            </Typography>
                        </CardContainer>
                        <CardContainer elevation={0}>
                            <ClarityBoltLine width="60" height="60" color="rgba(255, 255, 255, 0.85)"/>
                            <Typography sx={{fontSize:'20px', color: 'white', textAlign:'center',height:{xs:'90px'}}}>
                            Genera y gestiona rutinas en tan solo minutos facilmente
                            </Typography>
                        </CardContainer >
                </DownFeaturesContainer>

            </FeaturesContainer>
            <ContactFormContainer>
              <Box >
                <Box>
                <Typography sx={{
                    textAlign:{xs:'center'}, 
                    width:{xs:'100%'},
                     fontFamily:'nunito',
                     fontWeight:'400',
                     fontSize:'45px',
                     margin:'0',
                     width:'100%',
                     
                }}>
                    Contacto
                </Typography>
                <Typography sx={{textAlign:{xs:'center'}, width:{xs:'100%'},
                     fontFamily:'nunito',
                     fontSize:'22px',
                     fontWeight:'300',
                    // width:'50%',
                     
                }}>
                    No dudes en ponerte en contacto con nosotros.
                </Typography>
                </Box>
              
                <ContactForm />
              </Box>
            </ContactFormContainer>
                        
        </LandingMainContainer>
    );
};

export default Landing;

const LandingMainContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    padding: '0 16px',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    
    position: "relative",
   

    [theme.breakpoints.up('md')]: {
       padding:' 0 120px',
       // overflowY: 'hidden',
      },
    
}));

const HeroContainer = styled(Box)(({ theme }) => ({
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        marginTop:'150px',
        // border:'1px solid red',
    


    [theme.breakpoints.up('md')]: {
        width: "100%",
        height: "100vh",
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:'0'
      },
    
}));

const HeroLeftContainer = styled(Box)(({ theme }) => ({
       width:'100%',
       height:'auto',
       display:'flex',
       flexDirection:'column',
       alignItems:'center',
    
    [theme.breakpoints.up('md')]: {
        width: "50%",
        height: "40%",
        //boxSizing:'border-box',
        display:'flex',
        flexDirection:'column',
        alignItems:'flex-start'
    
      },
    
}));

const HeroRightContainer = styled(Box)(({ theme }) => ({
    
        width: "100%",
        height: "350px",
        backgroundImage:`url(${heroImage})`,
        backgroundSize: 'cover', // Ajusta la imagen para cubrir el div completamente
        backgroundPosition: 'center', // Centra la imagen
        backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
        borderRadius:'5px',
        marginTop:'55px',


    [theme.breakpoints.up('md')]: {
        width: "40%",
        height: "40%",
        marginTop:'0'
            
      },
    
}));

const HeroTextContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100%",
   
    


    [theme.breakpoints.up('md')]: {
       
      },
    
}));

const HeroTitle = styled(Box)(({ theme }) => ({
    width:'100%',
    fontFamily:'nunito',
    fontWeight:'bold',
    fontSize:'40px',
    textAlign:'center',
    lineHeight:'1',

    


    [theme.breakpoints.up('md')]: {
        textAlign:'left',
        fontSize:'75px',
        
      },
    
}));

const HeroSubTitle = styled(Box)(({ theme }) => ({
    width:'100%',
    fontFamily:'nunito',
    fontWeight:'300',
    fontSize:'22px',
    textAlign:'center',
    lineHeight:'1',
    marginTop:'10px',

    


    [theme.breakpoints.up('md')]: {
        textAlign:'left',
        fontSize:'35px',
        marginTop:'0'
        
      },
    
}));

const AboutUsContainer = styled(Box)(({ theme }) => ({
   
        width: "100%",
        height: "100%",
        display:'flex',
        flexDirection:'column',
        marginTop:'80px',
        marginBottom:'80px',


    [theme.breakpoints.up('md')]: {
        width: "100%",
        height: "100%",
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
        marginBottom:'80px'
      },
    
}));

const AboutUsLeft = styled(Box)(({ theme }) => ({
    width:'100%',
    height:'100%',
    boxSizing:'border-box',
    display:'flex',
    flexDirection:'column',
    gap:'15px',
    justifyContent:'space-between',
   // alignItems:'center',
   
    


    [theme.breakpoints.up('md')]: {
        width: "45%",
        height: '650px',
        gap:'35px',
       // border:'1px solid red',
       // marginTop:'100px',
       
      },
    
}));

const AboutUsRight = styled(Box)(({ theme }) => ({
        width:'100%',
        height:'400px',
        backgroundImage:`url(${aboutPicture})`,
        backgroundSize: 'cover', // Ajusta la imagen para cubrir el div completamente
        backgroundPosition: 'center', // Centra la imagen
        backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
        borderRadius:'5px',
        marginTop:'20px',
    


    [theme.breakpoints.up('md')]: {
        width: "50%",
        height: "650px",
       
       
      },
    
}));

const SubTitle = styled(Box)(({ theme }) => ({
    width:'100%',
    fontFamily:'nunito',
    fontWeight:'bold',
    fontSize:'28px',
    textAlign:'center',
    lineHeight:'1',

    


    [theme.breakpoints.up('md')]: {
        fontFamily:'nunito',
         fontWeight:'bold',
         fontSize:'45px',
        lineHeight:'0.8',
         width:'70%',
        marginBottom:'20px',
        textAlign:'left'
        
      },
    
}));

const Paragraph = styled(Box)(({ theme }) => ({
    width:'100%',
    fontFamily:'nunito',
    fontWeight:'300',
    fontSize:'16px',
    textAlign:'center',
    //lineHeight:'1',

    


    [theme.breakpoints.up('md')]: {
        fontFamily:'nunito',
        fontSize:'24px',
        fontWeight:'300',
        lineHeight:'1.3',
        marginBottom:'24px',
        textAlign:'left'
        
      },
    
}));

const FeaturesContainer = styled(Box)(({ theme }) => ({
   
    width: "100%",
    height:'auto',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    


    [theme.breakpoints.up('md')]: {
        width: "100%",
        height: "100vh",
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-end',
       // gap:'20px'
        
       
      },
    
}));

const UpFeaturesContainer = styled(Box)(({ theme }) => ({
   
   
    


    [theme.breakpoints.up('md')]: {
        width: "100%",
        height: "40%",
       // border:'1px solid blue',
        display:'flex',
        justifyContent:'space-between',
        marginBottom:'100px',
       
      },
    
}));

const UpFeaturesText = styled(Box)(({ theme }) => ({
   
        width:'100%',
        display:'flex',
       flexDirection:'column',
       alignItems:'center',
    


    [theme.breakpoints.up('md')]: {
       width:'40%',
       height:'100%',
       alignItems:'flex-start',
       justifyContent:'space-between'
      
       
      },
    
}));

const FeatureContent = styled(Box)(({ theme }) => ({
       width:'100%',
       height:'100%',
       display:'flex',
       flexDirection:'column',
       alignItems:'center',
       gap:'10px',
   
    


    [theme.breakpoints.up('md')]: {
      
        alignItems:'flex-start'
       
      },
    
}));

const UpFeaturesPicture = styled(Box)(({ theme }) => ({
   
   
    


    [theme.breakpoints.up('md')]: {
       width:'55%',
       height:'100%',
     //  border:'1px solid violet',
       borderRadius:'5px',
       backgroundImage:`url(${featurePicture})`,
       backgroundSize: 'cover', // Ajusta la imagen para cubrir el div completamente
       backgroundPosition: 'center', // Centra la imagen
       backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
       
      },
    
}));



const DownFeaturesContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height:'700px',
    background: 'linear-gradient(45deg, #C004FF, #730399)',
    boxSizing:'border-box',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:'80px',
    borderRadius:'8px',
    boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.5), 0px 12px 35px rgba(0, 0, 0, 0.2)',
    


    [theme.breakpoints.up('md')]: {
       
        height: "30%",
        flexDirection:'row',
             
        borderRadius:'0',
        boxShadow:'none',
        alignItems:'center',
        justifyContent:'space-between'
       
      },
    
}));

const CardContainer = styled(Card)(({ theme }) => ({
   
    background: 'transparent',
    padding:'20px',
    width:'70%',
    height:'150px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'space-between',
    gap:'10px',


    [theme.breakpoints.up('md')]: {
        width: "20%",
        height: "100%",
       
      //  border:'1px solid black',
       
        boxSizing:'border-box',
        
        alignItems:'center',
        justifyContent:'center',
        gap:'50px',
        boxSizing:'border-box',
        cursor:'pointer'

       
       
      },
    
}));



const LogginFormOverlay = styled(Box)(({ }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
}));



const CustomButtom = styled(Button)(({ theme }) => ({
    
    background: 'linear-gradient(45deg, #C004FF, #730399)',
    color: 'white',
    width: '50%',
    height: '50px',
    marginTop:'25px',
    borderRadius:'5px',
    


    [theme.breakpoints.up('md')]: {
        width: '30%',
        height: '60px',
      
      },
    
}));

const ContactFormContainer = styled(Box)(({ theme }) => ({

    width:'100%',
    height:'auto',
    padding:'10px',
    boxSizing:'border-box',
    backgroundImage:`url(${contactImage})`,
    marginBottom:'50px',
   display:'flex',
   flexDirection:'column',
   alignItems:'center',
   marginTop:'50px',
   borderRadius:'8px',
   
  
    [theme.breakpoints.up('md')]: {
         alignItems:'flex-start',
         justifyContent:'center',
         height:'100vh'
    },
  }));


{/* <ContentContainer>

{orderedSections.length > 0 && orderedSections.map((section, index) => (
    <SectionBox id={`${section.id}`} key={section.id}>
        <Typography sx={{
            width: '100%',
            color: section.sectionStyle.titulo.color || 'white',
            fontFamily: section.sectionStyle.titulo.fontFamily,
            fontSize: section.sectionStyle.titulo.fontSize || '24px',
        }} variant="h5">{section.settings.titulo}</Typography>
        <Typography sx={{
            width: '100%',
            color: section.sectionStyle.subTitulo.color || 'white',
            fontFamily: section.sectionStyle.subTitulo.fontFamily,
            fontSize: section.sectionStyle.subTitulo.fontSize || '24px',
        }}>{section.settings.subTitulo}</Typography>
        <br />
        <Typography sx={{
            width: '100%',
            color: section.sectionStyle.cuerpo.color || 'white',
            fontFamily: section.sectionStyle.cuerpo.fontFamily,
            fontSize: section.sectionStyle.cuerpo.fontSize || '24px',
        }}>{section.settings.cuerpo}</Typography>
        <MultimediaContainer>
            {section.settings.imagenes.map((url, index) => (
                <img key={index} src={url} alt={`multimedia-${index}`} style={{ width: '100%', marginBottom: '10px' }} />
            ))}
        </MultimediaContainer>
    </SectionBox>
))}


{posts.length > 0 ? (
    <Box>
        {posts.map((post) => (
            <PostItem key={post.id}>
                <Typography variant="h6">{post.titulo}</Typography>
                <Typography variant="subtitle1">{post.subTitulo}</Typography>
                <Typography variant="body1">{post.cuerpo}</Typography>
                <MultimediaContainer>
                    {post.multimedia.map((url, index) => (
                        <img key={index} src={url} alt={`multimedia-${index}`} style={{ width: '100%', marginBottom: '10px' }} />
                    ))}
                </MultimediaContainer>
            </PostItem>
        ))}
    </Box>
) : null}


</ContentContainer> */}
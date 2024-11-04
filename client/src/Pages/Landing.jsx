import React, { useEffect, useState } from "react";
import { Box, Typography, styled } from '@mui/material';
import NavBar from "../Components/NavBar/NavBar";
//import Footer from "../Components/Footer/Footer";
import { usePostStore } from "../store/usePostStore";
import { useSectionStore } from "../store/useSectionStore";
import LogginForm from "../Components/logginForm/LogginForm";
import Swal from "sweetalert2";
import { keys } from "@mui/system";
import LandingDrawer from "../Components/landingDrawer/LandingDrawer";


const Landing = ({ setVerifiedUser }) => {
    const { getPost, posts } = usePostStore();
    const { getSections, sections } = useSectionStore();
    const [orderedSections, setOrderedSections] = useState([]);
    const [loggin, setLoggin] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedFont, setSelectedFont] = useState([]); // Estado para la fuente seleccionada
    const [selectedFontSize, setSelectedFontSize] = useState([]);
    const [openDrawer, setOpendrawer] = useState(false);
    
    
    const hanldeCloseDrawer = () => {
        setOpendrawer(false)
    };

   const handleSections = () => {
    if (sections && sections.length > 0) {
        const sortedSections = sections
            .sort((a, b) => a.settings.orden - b.settings.orden)
            .map(section => {
                let parsedStyle = {};
                try {
                    // Parsear el estilo de la sección
                    if (typeof section.settings.sectionStyle === 'string') {
                        parsedStyle = JSON.parse(section.settings.sectionStyle);
                    }
                } catch (e) {
                    console.error("Error parsing sectionStyle:", e);
                }

                // Recopilar fuentes y tamaños de fuente para cargar
                const fontsToLoad = [];
                const sizesToLoad = [];
                const colorsToLoad = [];
                for (const style of Object.values(parsedStyle)) {
                    if (style.fontFamily && !fontsToLoad.includes(style.fontFamily)) {
                        fontsToLoad.push(style.fontFamily);
                    }
                    if (style.fontSize && !sizesToLoad.includes(style.fontSize)) {
                        sizesToLoad.push(style.fontSize); // Aquí capturas el tamaño de la fuente
                    }
                    if (style.color && !colorsToLoad.includes(style.color)) {
                        colorsToLoad.push(style.color);
                    }
                }

                // Actualizar los estados para las fuentes y tamaños seleccionados
                setSelectedFont(prevFonts => [...new Set([...prevFonts, ...fontsToLoad])]);
                setSelectedFontSize(prevSizes => [...new Set([...prevSizes, ...sizesToLoad])]);

                return {
                    ...section,
                    sectionStyle: parsedStyle // Asegurarte de que los estilos estén bien parseados
                };
            });
        setOrderedSections(sortedSections);
    }
};
useEffect(() => {
    selectedFont.forEach(font => {
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${font.replace(' ', '+')}&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        // Limpieza: elimina el enlace cuando la fuente cambia o se desmonta el componente
        return () => {
            document.head.removeChild(link);
        };
    });
}, [selectedFont]);

    useEffect(() => {
        getSections();
        getPost();
    }, [getSections, getPost]);

    useEffect(() => {
        handleSections();
    }, [sections]);

    // Show SweetAlert when message changes
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

    return (
        <LandingMainContainer>
            <NavBar setLoggin={setLoggin} setOpendrawer={setOpendrawer} />
            {openDrawer && <LandingDrawer open={openDrawer} close={hanldeCloseDrawer} sections={sections} />} {/* Renderizado condicional del Drawer */}
            {loggin && (
                <LogginFormOverlay>
                    <LogginForm setLoggin={setLoggin} setVerifiedUser={setVerifiedUser} setMessage={setMessage} />
                </LogginFormOverlay>
            )}
            <ContentContainer>
                {/* Renderizar las secciones ordenadas */}
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
    
                {/* Renderizar los posts después de las secciones */}
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
    
                {/* <Footer /> */}
            </ContentContainer>
        </LandingMainContainer>
    );
};

export default Landing;

const LandingMainContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100vh",
    boxSizing: "border-box",
    padding: '0 16px',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "black",
    position: "relative",
    boxSizing: 'border-box'
}));

const ContentContainer = styled(Box)(({ }) => ({
    position: "relative",
    width: "100%",
    height: "100%",
}));

const LogginFormOverlay = styled(Box)(({ }) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
}));

const PostItem = styled(Box)(({ }) => ({
    backgroundColor: "#1e1e1e",
    padding: "20px",
    borderRadius: "8px",
    color: "white",
    marginBottom: "20px",
}));

const MultimediaContainer = styled(Box)(({ }) => ({
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
}));

const SectionBox = styled(Box)(({ }) => ({
    width: '100%',
    height: 'auto',
    boxSizing: 'border-box',
    display: "flex",
    flexDirection: "column",
    marginTop: "100px",
    marginBottom: '25px'
}));

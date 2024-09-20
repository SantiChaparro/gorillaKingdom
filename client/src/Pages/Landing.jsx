import React, { useEffect, useState } from "react";
import { Box, Typography, styled } from '@mui/material';
import NavBar from "../Components/NavBar/NavBar";
import Footer from "../Components/Footer/Footer";
import { usePostStore } from "../store/usePostStore";
import { useSectionStore } from "../store/useSectionStore";
import LogginForm from "../Components/logginForm/LogginForm";
import Swal from "sweetalert2";

const Landing = ({ setVerifiedUser }) => {
    const { getPost, posts } = usePostStore();
    const { getSections, sections } = useSectionStore();
    const [orderedSections, setOrderedSections] = useState([]);
    const [loggin, setLoggin] = useState(false);
    const [message, setMessage] = useState("");

    const handleSections = () => {
        if (sections && sections.length > 0) {
            const sortedSections = sections.sort((a, b) => a.settings.orden - b.settings.orden);
            setOrderedSections(sortedSections);
        }
    };

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
            <NavBar setLoggin={setLoggin} />
            {loggin && (
                <LogginFormOverlay>
                    <LogginForm setLoggin={setLoggin} setVerifiedUser={setVerifiedUser} setMessage={setMessage} />
                </LogginFormOverlay>
            )}
            <ContentContainer>
                <div className="w-full h-full bg-gray-800 p-4 flex items-center justify-center">
                    <h1 className="text-2xl text-blue-500">Probando Tailwind</h1>
                </div>

                {/* Renderizar las secciones ordenadas */}
                {orderedSections.length > 0 && orderedSections.map((section, index) => (
                    <SectionBox key={index}>
                        <Typography sx={{ color: 'white' }} variant="h5">{section.settings.titulo}</Typography>
                        <Typography sx={{ color: 'white' }}>{section.settings.subTitulo}</Typography>
                        <br />
                        <Typography sx={{ color: 'white' }}>{section.settings.cuerpo}</Typography>
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

                <Footer />
            </ContentContainer>
        </LandingMainContainer>
    );
};

export default Landing;

const LandingMainContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100vh",
    boxSizing: "border-box",
    padding: '15px',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "black",
    position: "relative",
    boxSizing:'border-box'
}));

const ContentContainer = styled(Box)(({}) => ({
    position: "relative",
    width: "100%",
    height: "100%",
}));

const LogginFormOverlay = styled(Box)(({}) => ({
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

const PostItem = styled(Box)(({}) => ({
    backgroundColor: "#1e1e1e",
    padding: "20px",
    borderRadius: "8px",
    color: "white",
    marginBottom: "20px",
}));

const MultimediaContainer = styled(Box)(({}) => ({
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
}));

const SectionBox = styled(Box)(({}) => ({
    width: '100%',
    height: 'auto',
    boxSizing: 'border-box',
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
    marginBottom: '25px'
}));

import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { blue } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';  // Importa js-cookie


const LogginForm = ({ setLoggin, setVerifiedUser,setMessage }) => {
    const [password, setPassword] = useState("");
    const [dni, setDni] = useState("");

    const navigate = useNavigate();

    console.log(password);
    console.log(dni);

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
                    navigate('/usuario');  // Redirigir al dashboard del usuario
                }
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                Cookies.remove('token');  // Remover el token si es inválido
            }
        }
    }, [navigate, setVerifiedUser]);


    const handleDniChange = (event) => {
        const dni = event.target.value;
        setDni(dni)
    };


    const handlePasswordChange = (event) => {
        const password = event.target.value;
        setPassword(password)
    }

    const handleSubmit = async () => {
        const response = await axios.post(`http://localhost:3001/loggin/postLoggin`, { dni, password });
        console.log(response.data);
        const token = response.data.token;
        if(token){
            if (token) {
                const decodedToken = jwtDecode(token); 
                Cookies.set('token', token, { expires: 1 });  // La cookie expira en 1 día// Decodificar el token
                console.log('Contenido del token:', decodedToken); // Loguear el contenido
            }
        }
        if (response.data.success) {
            await setVerifiedUser(response.data.user)
            navigate('/usuario');

        }else {
            await setMessage(response.data.message)
        }
        setLoggin(false);

    };

    return (
        <LogginMainContainer>
            <FormContainer>
                <CustomtextField
                    label='dni'
                    value={dni}
                    onChange={handleDniChange}
                    InputProps={{
                        style: {
                            borderColor: 'white',
                        },
                    }}
                    sx={{
                        '& .MuiInputBase-root': {
                            color: 'white', // Text color inside the input field
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white', // Label color
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white', // Border color
                            },
                            '&:hover fieldset': {
                                borderColor: 'white', // Border color on hover
                            },
                        },
                    }}
                />
                <CustomtextField
                    label='clave'
                    value={password}
                    onChange={handlePasswordChange}
                    InputProps={{
                        style: {
                            borderColor: 'white',
                        },
                    }}
                    sx={{
                        '& .MuiInputBase-root': {
                            color: 'white', // Text color inside the input field
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white', // Label color
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'white', // Border color
                            },
                            '&:hover fieldset': {
                                borderColor: 'white', // Border color on hover
                            },
                        },
                    }}
                />
                <Button sx={{ backgroundColor: 'blue', color: 'white', width: '80%' }} onClick={() => { handleSubmit(dni, password, setLoggin,setVerifiedUser) }}>INGRESAR</Button>
            </FormContainer>
        </LogginMainContainer>


    )
};

export default LogginForm;

const LogginMainContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    height: "100vh",
    boxSizing: "border-box",
    padding: '15px',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Slightly dark background to highlight the form
    position: "relative", // Ensure the overlay is positioned relative to this container// Ensure the overlay is positioned relative to this container
}));

const FormContainer = styled(Box)(({ theme }) => ({
    width: '300px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    border: '1px solid white',
    borderRadius: '15px',
    boxShadow: '0px 4px 8px rgba(255, 255, 255, 0.5)', // Light shadow for elevation
    padding: '20px',
}));

const CustomtextField = styled(TextField)(({ theme }) => ({
    width: '80%'
}));
import React, { useState, useEffect } from "react";
import { Box, Button, Paper, TextField, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  // Importa SweetAlert2
import { useLogginStore } from "../../store/useLogginStore";

const LogginForm = ({ setVerifiedUser, setMessage }) => {
    const { postLoggin, logginResponse, setLoggin } = useLogginStore();
    const [password, setPassword] = useState("");
    const [dni, setDni] = useState("");
    const navigate = useNavigate();

    const handleDniChange = (event) => {
        const dni = event.target.value;
        setDni(dni);
    };

    const handlePasswordChange = (event) => {
        const password = event.target.value;
        setPassword(password);
    };

    const handleSubmit = async () => {
        if (dni !== "" && password !== "") {
            await postLoggin(dni, password);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Upss!',
                text: 'Llena todos los campos.',
                showConfirmButton: true,
            });
        }
    };

    // Manejar la respuesta de logginResponse una vez que esté disponible
    useEffect(() => {
        if (logginResponse.user) {
            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                text: '¡Bienvenido!',
                showConfirmButton: true,
            }).then(() => {
                console.log('Usuario logueado:', logginResponse);
                
                navigate('/home');  // Redirige a la página de inicio
            });
        } else if (logginResponse.error) {
            Swal.fire({
                icon: 'error',
                title: 'Error en el inicio de sesión',
                text: logginResponse.error,
                showConfirmButton: true,
            });
        }
    }, [logginResponse, navigate]);

    return (
        <LogginMainContainer>
            <FormContainer>
                <CustomtextField
                    label='DNI'
                    value={dni}
                    onChange={handleDniChange}
                    required
                    sx={textFieldStyles}
                />
                <CustomtextField
                    label='Clave'
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    sx={textFieldStyles}
                />
                <Button sx={buttonStyles} onClick={handleSubmit}>INGRESAR</Button>
            </FormContainer>
        </LogginMainContainer>
    );
};

export default LogginForm;


// Estilos personalizados para el formulario
const LogginMainContainer = styled(Paper)(({ theme }) => ({
    width: "auto",
    height: "auto",
    borderRadius: '15px',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    position: "relative",
}));

const FormContainer = styled(Box)(({ theme }) => ({
    width: '500px',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    border: '1px solid white',
    borderRadius: '15px',
    boxShadow: '0px 4px 8px rgba(255, 255, 255, 0.5)',
    padding: '20px',
    backgroundColor: 'white',
}));

const CustomtextField = styled(TextField)(({ theme }) => ({
    width: '80%',
}));

const buttonStyles = {
    backgroundColor: 'blue',
    color: 'white',
    width: '80%',
};

const textFieldStyles = {
    '& .MuiInputBase-root': {
        color: 'black', // Color del texto dentro del campo de entrada
    },
    '& .MuiInputLabel-root': {
        color: 'black', // Color de la etiqueta
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'black', // Color del borde
        },
        '&:hover fieldset': {
            borderColor: 'black', // Color del borde al pasar el ratón
        },
    },
};

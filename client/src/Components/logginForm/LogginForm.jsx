import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, styled } from '@mui/material';
import { blue } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LogginForm = ({ setLoggin, setVerifiedUser }) => {
    const [password, setPassword] = useState("");
    const [dni, setDni] = useState("");

    const navigate = useNavigate();

    console.log(password);
    console.log(dni);



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
        if (response.data.success) {
            await setVerifiedUser(response.data.user)
            navigate('/usuario');

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
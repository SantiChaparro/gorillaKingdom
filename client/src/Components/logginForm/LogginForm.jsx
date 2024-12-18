import React, { useEffect, useState } from "react";
import { Box, Button, Paper, TextField, Typography, styled } from '@mui/material';
import { blue } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';  // Importa js-cookie
import { useLogginStore } from "../../store/useLogginStore";
import Swal from 'sweetalert2';
//import { verifyUser } from "../../../../server/src/controllers/logginControllers";


const LogginForm = ({setVerifiedUser, setMessage }) => {
    const {postLoggin,logginResponse,setLoggin} =useLogginStore();
    const [password, setPassword] = useState("");
    const [dni, setDni] = useState("");

    const navigate = useNavigate();

    console.log(password);
    console.log(dni);
    console.log(logginResponse);
 
    const handleDniChange = (event) => {
        const dni = event.target.value;
        setDni(dni)
    };


    const handlePasswordChange = (event) => {
        const password = event.target.value;
        setPassword(password)
    }

    const handleSubmit = async () => {
        if(dni !== "" && password !== ""){
            await postLoggin(dni,password);
            setLoggin(false);
        }else{
            if(dni === "" || password === ""){
                Swal.fire({
                          icon: 'error',
                          title: 'Upss!',
                          text: 'LLena todos los campos.',
                          showConfirmButton: true,
                })
        }}
         
        
       

    };

    return (
        <LogginMainContainer>
            <FormContainer>
                <CustomtextField
                    label='dni'
                    value={dni}
                    onChange={handleDniChange}
                    required
                    InputProps={{
                        style: {
                            borderColor: 'white',
                        },
                    }}
                    sx={{
                        '& .MuiInputBase-root': {
                            color: 'black', // Text color inside the input field
                        },
                        '& .MuiInputLabel-root': {
                            color: 'black', // Label color
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black', // Border color
                            },
                            '&:hover fieldset': {
                                borderColor: 'black', // Border color on hover
                            },
                        },
                    }}
                />
                <CustomtextField
                    label='clave'
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    InputProps={{
                        style: {
                            borderColor: 'white',
                        },
                    }}
                    sx={{
                        width:'70%',
                        '& .MuiInputBase-root': {
                            color: 'black', // Text color inside the input field
                        },
                        '& .MuiInputLabel-root': {
                            color: 'black', // Label color
                        },
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'black', // Border color
                            },
                            '&:hover fieldset': {
                                borderColor: 'black', // Border color on hover
                            },
                        },
                    }}
                />
                <Button sx={{ backgroundColor: 'blue', color: 'white', width: '80%' }} onClick={ handleSubmit }>INGRESAR</Button>
            </FormContainer>
        </LogginMainContainer>


    )
};

export default LogginForm;

const LogginMainContainer = styled(Paper)(({ theme }) => ({
    width: "auto",
    height: "auto",
    boxSizing: "border-box",
    borderRadius:'15px',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Slightly dark background to highlight the form
    position: "relative", // Ensure the overlay is positioned relative to this container// Ensure the overlay is positioned relative to this container
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
    boxShadow: '0px 4px 8px rgba(255, 255, 255, 0.5)', // Light shadow for elevation
    padding: '20px',
    backgroundColor:'white'
}));

const CustomtextField = styled(TextField)(({ theme }) => ({
    width: '80%'
}))
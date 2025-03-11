import React,{useEffect,useState} from "react";
import Cookies from 'js-cookie';  // Importa js-cookie
import {jwtDecode} from 'jwt-decode';  // Importa jwt-decode
import {Box,Typography,styled} from "@mui/material";
import { color } from "@mui/system";


const UpdateActivity = () => { 

    return(
        <Box>
            <Typography variant="h4" align="center"sx={{color:'white'}}>Modificar Actividad</Typography>
        </Box>
    )


 };


export default UpdateActivity;
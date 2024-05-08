import React, {useState,useEffect} from "react";
import { Box, Drawer, Typography, ListItem, Button, Menu, MenuItem, ListItemIcon, ListItemText, TextField } from "@mui/material";



const CreateRoutine = () => {

    return(
        <>
            <Box sx={{width:'calc(100vw - 280px)', height:'30vh', border:'solid 1px black'}}>
                <Typography variant="h3" align="center">CREAR RUTINA</Typography>
                <Box>
                    <TextField
                    label="Dni usuario"
                    sx={{margin:'1em'}}
                    />
                </Box>
            </Box>
            <Box sx={{width:'calc(100vw - 240px)', display:'flex',justifyContent:'center',gap:'2em'}}>

                <Box sx={{width:'40vw',height:'70vh',border:'solid 1px black'}}>
                    <Typography>renderizado de ejercicios</Typography>
                </Box>
                <Box sx={{width:'40vw',height:'70vh',border:'solid 1px black'}}>
                    <Typography>renderizado de rutina</Typography>
                </Box>
            </Box>
        </>
        
    )
};


export default CreateRoutine;
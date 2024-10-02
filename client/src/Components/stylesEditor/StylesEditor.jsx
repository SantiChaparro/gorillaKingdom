import React, { useEffect, useState } from "react";
import { Box, TextField, Typography, styled, Button, Paper, IconButton } from '@mui/material';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import { ChromePicker } from 'react-color';
import axios from "axios";
import Select from 'react-select';

const StylesEditor = ({setSectionStyle,setFontEditing,fontEditing}) => {
    const [color, setColor] = useState('#ffffff');
    

    const handleFontSelection = () => {
        setFontEditing(!fontEditing);
    }

    return (
        <StyleeditorContainer>
            <StyledIconButton onClick={handleFontSelection}>
                <FontDownloadIcon fontSize='large' />
            </StyledIconButton>
            <StyledIconButton>
                <FormatSizeIcon fontSize='large' />
            </StyledIconButton>
            <StyledIconButton>
                <FormatColorFillIcon fontSize='large' />
            </StyledIconButton>
            <StyledIconButton>
                <FormatAlignLeftIcon fontSize='large' />
            </StyledIconButton>
            <StyledIconButton>
                <FormatAlignCenterIcon fontSize='large' />
            </StyledIconButton>
            <StyledIconButton>
                <FormatAlignRightIcon fontSize='large' />
            </StyledIconButton>
        </StyleeditorContainer>
    );
};

export default StylesEditor;

const StyleeditorContainer = styled(Paper)(({ theme }) => ({
    width: "100%",
    height: "auto",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-evenly',
    padding:'5px',
    marginBottom:'8px'
   
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    width: '50px', // Ancho fijo
    height: '50px', // Altura fija
    borderRadius: '5px', // Borde redondeado de 10px
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Transición suave para transform y box-shadow
    '&:hover': {
        transform: 'scale(1.5)', // Aumenta el tamaño al 150%
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.9)', // Sombra en hover
    },
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.9)', // Sombra por defecto
    color: 'black',

}));

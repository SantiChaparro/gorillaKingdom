import { width } from "@mui/system";
import React,{useState,useEffect} from "react";
import { SketchPicker } from 'react-color';

const ColorPicker = ({color,setColor}) => {

    const handleColorChange = (color) => {
        setColor(color.hex);
       // onColorChange(color.hex); // Llamar a la función de actualización del color en el padre
    };

    return (
        <div style={{marginBottom:'15px',width:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            
            <SketchPicker
                color={color}
                onChange={handleColorChange}
                style={{width:'100%'}}
            />
        </div>
    );

};

export default ColorPicker;
import { width } from "@mui/system";
import React, { useEffect, useState } from "react";
import Select from 'react-select';


const FontSizeSelector = ({ selectedFontSize, setSelectedFontSize }) => {

    const fontSizeOptions = [
        { value: '0.75em', label: 'Pequeño' },  // 12px en em (aproximadamente)
        { value: '1em', label: 'Normal' },      // 16px en em (base estándar)
        { value: '1.25em', label: 'Grande' },   // 20px en em (aproximadamente)
        { value: '1.5em', label: 'Extra Grande' } // 24px en em (aproximadamente)
    ];

    //  const FontSizeSelector = ({ onFontSizeChange }) => {


    const handleChange = (option) => {
        setSelectedFontSize(option);
        //onFontSizeChange(option.value); // Pasar el valor seleccionado
    };

    return (
        <div style={{width: '100%', marginBottom: '15px', marginTop: '0px'}}>
            <Select
                value={selectedFontSize}
                onChange={handleChange}
                options={fontSizeOptions}
                isSearchable={false} // Si no quieres que sea un campo de búsqueda
                placeholder="Seleccionar tamaño de fuente"

            />
        </div>

    );
};




export default FontSizeSelector;
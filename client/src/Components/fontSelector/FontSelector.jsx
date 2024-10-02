import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const FontSelector = ({ fonts, selectedFont, setSelectedFont }) => {
  // Crear las opciones para el select
  const options = fonts.map((font) => ({
    value: font.family,
    label: font.family,
  }));

  // Manejar cambio de fuente seleccionada
  const handleChange = (selectedOption) => {
    setSelectedFont(selectedOption);
  };

  // Efecto para cargar dinámicamente la fuente seleccionada desde Google Fonts
  useEffect(() => {
    if (selectedFont) {
      const fontUrl = `https://fonts.googleapis.com/css2?family=${selectedFont.value.replace(
        ' ',
        '+'
      )}&display=swap`;

      // Crear y añadir un <link> al <head> para cargar la fuente desde Google Fonts
      const link = document.createElement('link');
      link.href = fontUrl;
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      // Limpieza: elimina el enlace cuando la fuente cambia o se desmonta el componente
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [selectedFont]);

  // Personalizar estilos para las opciones
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontFamily: state.data.value, // Aplicar la fuente a cada opción
      fontSize: '16px',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontFamily: state.data.value, // Aplicar la fuente al valor seleccionado
      fontSize: '16px',
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: '16px',
    }),
    control: (provided) => ({
      ...provided,
      fontSize: '16px',
    }),
  };

  // Usamos getOptionLabel para que cada opción aparezca con su estilo de fuente
  const getOptionLabel = (option) => (
    <span style={{ fontFamily: option.value }}>{option.label}</span>
  );

  return (
    <div style={{ width: '100%', marginBottom: '15px', marginTop: '0px' }}>
      <Select
        value={selectedFont}
        onChange={handleChange}
        options={options}
        getOptionLabel={getOptionLabel} // Mostrar las opciones con su fuente
        styles={customStyles} // Aplicar los estilos personalizados
      />
    </div>
  );
};

export default FontSelector;

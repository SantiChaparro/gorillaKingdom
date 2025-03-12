import React, { useState } from 'react';
import { Box, TextField, Button, Typography, TextareaAutosize } from '@mui/material';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    query: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de datos
    console.log('Formulario enviado:', formData);
    setSubmitted(true);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        //alignItems:'center',
        gap: 4,
        width: '100%',
        //maxWidth: '400px',
        backgroundColor: 'transparent',
        borderRadius: '8px',
       
      }}
    >
     
      <TextField
        label="Nombre"
        variant="outlined"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        sx={{backgroundColor:'white', borderRadius:'5px',border:'1px solid black'}}
      />

      <TextField
        label="Mail"
        variant="outlined"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        sx={{backgroundColor:'white', borderRadius:'5px',border:'1px solid black'}}
      />

      <TextField
        label="Consulta"
        variant="outlined"
        name="query"
        value={formData.query}
        onChange={handleChange}
        required
        multiline
        minRows={4}
        sx={{backgroundColor:'white', borderRadius:'5px',border:'1px solid black'}}
      />

      <Button variant="contained"  type="submit" sx={{
         background: 'linear-gradient(45deg, #C004FF, #730399)',
         color: 'white',
         width: '100%',
         height: '60px',
      }}>
        Enviar
      </Button>

      {submitted && (
        <Typography color="success" textAlign="center" sx={{ mt: 2 }}>
          ¡Formulario enviado con éxito!
        </Typography>
      )}
    </Box>
  );
};

export default ContactForm;

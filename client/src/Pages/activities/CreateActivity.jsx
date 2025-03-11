import React,{useEffect,useState} from "react";
import { Formik, Form, Field , useFormik} from 'formik';
import * as Yup from 'yup';
import { useActivitiesStore } from "../../store/useActiviriesStore";
import Cookies from 'js-cookie';  // Importa js-cookie
import {jwtDecode} from 'jwt-decode';  // Importa jwt-decode
import {Box,Typography,Button,TextField,CircularProgress,styled} from "@mui/material";
import { color, padding } from "@mui/system";
import Swal from 'sweetalert2';


const validationSchema = Yup.object({
    nombre: Yup.string()
      .required('El nombre es obligatorio')
      .min(3, 'El nombre debe tener al menos 3 caracteres'),
    costo: Yup.number()
      .required('El costo es obligatorio')
      .min(1, 'El costo debe ser al menos 1'),
    descripcion: Yup.string()
      .required('La descripción es obligatoria')
      .min(10, 'La descripción debe tener al menos 10 caracteres'),
  });


const CreateActivity = () => { 
    const [TenantId, setTenantId] = useState('');
    const {newActivity} = useActivitiesStore();

    console.log('tenant id desde createactivity',TenantId);
    

    useEffect(() => {
        const token = Cookies.get('token');
        console.log('token desde createactivity',token);
        
        const decoded = jwtDecode(token);
        console.log('decoded desde createactivity',decoded);
        
        setTenantId(decoded.TenantId);
    },[TenantId]);

    const formik = useFormik({
        initialValues: {
            nombre: '',
            costo: '',
            descripcion: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const activity = await newActivity(values.nombre, values.costo, values.descripcion, TenantId);
                if (activity) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Actividad creada exitosamente',
                        text: `La actividad "${activity.nombre}" ha sido creada.`,
                        confirmButtonText: 'OK',
                    });
                }
                resetForm();
            } catch (error) {
                console.error('Error al crear la actividad', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al crear la actividad',
                    text: 'Hubo un problema al crear la actividad. Intenta de nuevo.',
                    confirmButtonText: 'OK',
                });
            }
        },
    });


    return(
        <MainContainer>
            <MainContentContainer>
             <Typography variant="h4" align="center"sx={{color:'black',marginTop:'5px'}}>Nueva Actividad</Typography>
             <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 3 }}>
      <TextField
        fullWidth
        id="nombre"
        name="nombre"
        label="Nombre de la actividad"
        value={formik.values.nombre}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.nombre && Boolean(formik.errors.nombre)}
        helperText={formik.touched.nombre && formik.errors.nombre}
        margin="normal"
      />
      <TextField
        fullWidth
        id="costo"
        name="costo"
        label="Costo"
        type="number"
        value={formik.values.costo}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.costo && Boolean(formik.errors.costo)}
        helperText={formik.touched.costo && formik.errors.costo}
        margin="normal"
      />
      <TextField
        fullWidth
        id="descripcion"
        name="descripcion"
        label="Descripción"
        value={formik.values.descripcion}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
        helperText={formik.touched.descripcion && formik.errors.descripcion}
        margin="normal"
      />
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        disabled={formik.isSubmitting}
        sx={{ mt: 2 }}
      >
        {formik.isSubmitting ? <CircularProgress size={24} /> : 'Crear Actividad'}
      </Button>
    </Box>
            </MainContentContainer>
        </MainContainer>
    )


 };


export default CreateActivity;

const MainContainer = styled(Box)(({ theme }) => ({
    width: '100vw',
    height: '100vh',
    padding: '15px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  
    [theme.breakpoints.up('md')]: {
      width: 'calc(100vw - 240px)',
      height:'calc(100vh - 54px)',
      marginTop: '54px',
      marginLeft: '240px',
      display:'flex',
      padding:'0',
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor:'white'
     
      //justifyContent: 'space-around',
    },
  }));

  const MainContentContainer = styled(Box)(({ theme }) => ({
    width: '100vw',
    height: '100%',
    padding:'15px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  
    [theme.breakpoints.up('md')]: {
      maxWidth: '50%',
      height:'100%',
      padding:'0 15px',
      boxSizing:'border-box',
      justifyContent:'start ',
    
     
      
    },
   
  }));
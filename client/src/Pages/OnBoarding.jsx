import React,{useState,useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, MenuItem, Box, styled, Typography } from "@mui/material";
import axios from "axios";
//import apiUrl from "../configUrl";

console.log('apiurl',apiUrl);
console.log('hola mundo');

const apiUrl = process.env.REACT_APP_API_URL;

const Onboarding = ()=>{
  const [plans , setPlans] = useState([]);

  console.log(plans);
  

    const formik = useFormik({
        initialValues: {
          dni: "",
          nombre: "",
          telefono: "",
          mail: "",
          password: "",
          plan: "", // Valor por defecto
        },
        validationSchema: Yup.object({
          dni: Yup.string()
            .matches(/^\d+$/, "El DNI solo debe contener números")
            .required("DNI es requerido"),
          nombre: Yup.string().required("Nombre es requerido"),
          telefono: Yup.string().required("Teléfono es requerido"),
          mail: Yup.string().email("Email inválido").required("Email es requerido"),
          password: Yup.string()
            .min(8, "La contraseña debe tener al menos 8 caracteres")
            .required("Contraseña es requerida"),
         // plan: Yup.required("Debes seleccionar un plan"),
        }),
        onSubmit: async(values) => {
          console.log("Formulario enviado con los valores:", values);
          handleSubmit(values);
          
          // Aquí puedes hacer el envío a tu backend
        },
      });

      const handleSubmit = async (values) => {
        const response = await axios.post(`${apiUrl}/tenant-payment/create-preference/`,values)
        console.log(response);

        const { init_point } = response.data;

        // Redirige al usuario al init_point de MercadoPago
        window.location.href = init_point;


      };

      const getPlans = async()=>{
        

        // const response = await axios.get(`${apiUrl}/plans-router/plans`);
        const response = await axios.get(`${apiUrl}/plans-router/plans`);

        if(response){
          setPlans(response.data);
        }

      };

      
      useEffect(()=>{
        getPlans();
      },[])


    
      return (
        <OnBoardingMainContainer>
            <TitleContainer>
                <CustomTitle>Registro</CustomTitle>
            </TitleContainer>
            <ContentContainer>
            <FormContainer component="form" onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="DNI"
            id="dni"
            name="dni"
            value={formik.values.dni}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dni && Boolean(formik.errors.dni)}
            helperText={formik.touched.dni && formik.errors.dni}
          />
    
          <TextField
            fullWidth
            label="Nombre del gimnasio"
            id="nombre"
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
          />
    
          <TextField
            fullWidth
            label="Teléfono"
            id="telefono"
            name="telefono"
            value={formik.values.telefono}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.telefono && Boolean(formik.errors.telefono)}
            helperText={formik.touched.telefono && formik.errors.telefono}
          />
    
          <TextField
            fullWidth
            label="Email"
            id="mail"
            name="mail"
            value={formik.values.mail}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mail && Boolean(formik.errors.mail)}
            helperText={formik.touched.mail && formik.errors.mail}
          />
    
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
    
    <TextField
  fullWidth
  select
  label="Plan"
  id="plan"
  name="plan"
  value={formik.values.plan}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.plan && Boolean(formik.errors.plan)}
  helperText={formik.touched.plan && formik.errors.plan}
>
  {plans.map((plan) => (
    <MenuItem key={plan.id} value={plan}>
      {plan.name} - ${plan.price} {/* Puedes mostrar el precio o lo que necesites */}
    </MenuItem>
  ))}
</TextField>
    
          <Button color="primary" variant="contained" type="submit">
            Siguiente
          </Button>
        </FormContainer>
            </ContentContainer>
        
        </OnBoardingMainContainer>
      );

};

export default Onboarding;


const OnBoardingMainContainer = styled(Box)(({ theme }) => ({
    width: "100vw",
    minHeight: "100vh",
    boxSizing: "border-box",
    padding: '0 16px',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
      
  
   
  
    [theme.breakpoints.up('md')]: {
      height:'100%',
       padding:' 0 120px',
        overflowX: 'hidden',
      },
    
  }));

  const TitleContainer = styled(Box)(({ theme }) => ({
   width:'100%',
   height:'auto',
   textAlign:'center',
  
   
  
    [theme.breakpoints.up('md')]: {
      padding:'0 16px'
      },
    
  }));

  const CustomTitle = styled(Typography)(({ theme }) => ({
    width:'100%',
    fontFamily:'nunito',
    fontWeight:'700',
    fontSize:'45px',
    
   
    
   
     [theme.breakpoints.up('md')]: {
       padding:'0 16px'
       },
     
   }));

   const ContentContainer = styled(Box)(({ theme }) => ({
    width:'100%',
    height:'100%',
    display:'flex',
    
   
    
   
     [theme.breakpoints.up('md')]: {
       padding:'0 16px'
       },
     
   }));

  

  const FormContainer = styled(Box)(({ theme }) => ({
    width: '45%',
    height:'100%', 
    display: "flex", 
    flexDirection: "column", 
    gap: 2 ,
    
  
    [theme.breakpoints.up('md')]: {
    
      },
    
  }));

  const DescriptionContainer = styled(Box)(({ theme }) => ({
    
    [theme.breakpoints.up('md')]: {
     
      },
    
  }));
import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useUsersStore } from "../../store/useUsersStore";
import { useActivitiesStore } from "../../store/useActiviriesStore";
import PaymentModeSelector from "../../Components/paymentModeSelector/PaymentModeSelector";
import Loader from '../../Components/loader/Loader';
import dayjs from "dayjs";
import axios from "axios";
import Swal from 'sweetalert2';
import { boxSizing, display, height, maxWidth } from "@mui/system";
import picture1 from '../../../src/assests/imagenes/payment1.png';
import picture2 from '../../../src/assests/imagenes/payment2.png';





const Payments = () => {
  const { getUserById, searchedUser } = useUsersStore();
  const { fetchActivities, fetchUserActivities, activities, userActivities,cleanUserActivities } = useActivitiesStore();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [amounts, setAmounts] = useState({});
  const [selectedPaymentMode , setSelectedPaymentMode ] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date()); 
  console.log(paymentDate);
  console.log(userActivities);
  console.log(searchedUser);
  
  

  const handleSearch = async () => {
    if (userId.trim()) {
      setLoading(true);
      try {
        await getUserById(userId);
        if (searchedUser) {
          fetchUserActivities(userId);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error.response.data.error);
        setLoading(false);
      }
    } else {
      console.error("Please enter a valid user ID");
    }
  };

  const handleUserId = (event) => {
    const id = event.target.value;
    setUserId(id);
  };

  const filteredActivities = activities.filter(activity =>
    userActivities.some(userActivity => userActivity.ActivityId === activity.id)
  );

  const handleAmountChange = (event, activityId) => {
    const amount = parseFloat(event.target.value) || 0; 

    
    setAmounts((prevAmounts) => ({
      ...prevAmounts,
      [activityId]: amount,
    }));

    
    setTotalAmount((prevTotalAmount) => {
      const previousAmount = amounts[activityId] || 0; 
      return prevTotalAmount - previousAmount + amount; 
    });
  };

  const handlePaymentModeChange =(event) => {
    const paymentMode = event.target.value;
    setSelectedPaymentMode(paymentMode);
  };

  const handleSubmit = async () => {
    const activityIds = Object.keys(amounts).filter(activityId => amounts[activityId] > 0);
  
    const paymentData = {
      dni: userId,
      monto: totalAmount,
      medio_pago: selectedPaymentMode,
      fecha_pago: dayjs(paymentDate).format("YYYY-MM-DD"), 
      activityIds
    };
  
    try {
      const response = await axios.post(`http://localhost:3001/master/postPayment`, paymentData);
      console.log(response.data);
      
     
      if (response.data) {
        Swal.fire({
          title: 'Pago realizado con éxito',
          text: 'El pago ha sido procesado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          // Limpiar los estados e inputs
          cleanUserActivities(); 
          setUserId("");
          setTotalAmount(0);
          setAmounts({});
          setSelectedPaymentMode("");
          setPaymentDate(new Date());
          
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo realizar el pago. Por favor, inténtalo de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      console.error("Error realizando el pago:", error);
  
      // Muestra una alerta en caso de error
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al realizar el pago. Por favor, intenta nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };
  

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <MainContainer>
      <LeftBox></LeftBox>
      <MainContentContainer>
      <CustomTitle>Nuevo Pago</CustomTitle>
      <SearchBox>
        <TextField
          label="Dni usuario"
          variant="outlined"
          value={userId || ""}
          onChange={handleUserId}
          name="Dni usuario"
          sx={{ ...textFieldStyles, width: "50%" }}
          InputLabelProps={{ style: { color: "black" } }}
        />
        <Button
          onClick={handleSearch}
          sx={{
            background: 'linear-gradient(45deg, #C004FF, #730399)',
            color: "white",
            width: "30%",
            height: "55px",
           
          }}
        >
          BUSCAR
        </Button>
      </SearchBox>
      <TableContainer component={Paper} elevation={4} sx={{ width: '100%', marginTop: 2, backgroundColor: "white",marginBottom:4 }}>
        <Table >
          <TableHead>
            <TableRow sx={{ width: '100%', borderBottom: "2px solid #ca99ef" }}>
              <TableCell sx={{ fontSize: '20px', color: "black", borderBottom: "none" }}>Actividad</TableCell>
              <TableCell sx={{ fontSize: '20px', color: "black", borderBottom: "none" }}>Costo</TableCell>
              <TableCell sx={{ fontSize: '20px', color: "black", borderBottom: "none" }}>Importe</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredActivities.map((activity) => (
              <TableRow key={activity.id} sx={{ borderBottom: "2px solid #ca99ef" }}>
                <TableCell sx={{ fontSize: '15px', color: "black", borderBottom: "none" }}>{activity.nombre}</TableCell>
                <TableCell sx={{ color: "black", borderBottom: "none" }}>{`$${activity.costo}`}</TableCell>
                <TableCell sx={{ borderBottom: "none" }}>
                  <TextField
                    type="number"
                    value={amounts[activity.id] || ''} 
                    onChange={(event) => handleAmountChange(event, activity.id)}
                    sx={{
                      width: "100px",
                      "& .MuiOutlinedInput-root": {
                        color: "black",
                        "& fieldset": {
                          borderColor: "black",
                        },
                        "&:hover fieldset": {
                          borderColor: "black",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                        },
                      },
                      "& .MuiInputBase-input": {
                        color: "black",
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{ color: 'white', fontSize: '24px', borderBottom: 'none' }}>Total a pagar</TableCell>
              <TableCell sx={{ borderBottom: 'none' }}></TableCell>
              <TableCell sx={{ color: 'white', fontSize: '24px', borderBottom: 'none' }}>${totalAmount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <PaymentModeSelector selectedPaymentmode={selectedPaymentMode} handlePaymentModeChange={handlePaymentModeChange}/>
      <Button
        type="submit"
        onClick={handleSubmit}
        sx={{
          background: 'linear-gradient(45deg, #C004FF, #730399)',
          color: "white",
          width: "100%",
          height: "60px",
          marginTop: "100px",
         
        }}
      >
        GENERAR PAGO
      </Button>
      </MainContentContainer>
      <RightBox></RightBox>
    </MainContainer>
  );
};

export default Payments;

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
    height:'100vh',
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
    height:'100vh',
    boxSizing:'border-box',
    //justifyContent:'center',
  
   
    
  },
 
}));

const LeftBox = styled(Box)(({ theme }) => ({
  display:'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
    width: '25%',
    height: '100%',
    boxSizing: 'border-box',
    //marginTop:'50px',
    backgroundImage: `url(${picture1})`,
    backgroundSize: 'cover',  // Asegura que la imagen cubra todo el área
    backgroundPosition: 'center',  // Centra la imagen
    backgroundRepeat: 'no-repeat',  // Evita que la imagen se repita
  },
}));

const RightBox = styled(Box)(({ theme }) => ({
 display:'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
    width: '25%',
    height: '100%',
    boxSizing: 'border-box',
    backgroundImage: `url(${picture2})`,
    backgroundSize: 'cover',  // Asegura que la imagen cubra todo el área
    backgroundPosition: 'center',  // Centra la imagen
    backgroundRepeat: 'no-repeat',  // Evita 
    
  
   
    
  },
 
}));



const CustomTitle = styled(Typography)(({ theme }) => ({
  marginTop: '100px',
  fontFamily: "Nunito",
  fontWeight: '700',
  fontSize: '3em',
  color: 'black',

  [theme.breakpoints.up('md')]: {
    marginTop:'40px',
    marginBottom:'100px'
 
   
    
  },
}));

const SearchBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '150px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const textFieldStyles = {
  width: '100%',
 backgroundColor: 'white',
 borderRadius: '5px',
  '& .MuiInputBase-input': {
      color: 'black'
  },
  '& .MuiOutlinedInput-root': {
      '& fieldset': {
          borderColor: 'black',
      },
      '&:hover fieldset': {
          //borderColor: '#ca99ef',
          border:'2px solid #ca99ef'
      },
      '&.Mui-focused fieldset': {
          borderColor: '#ca99ef',
      },
  },
  '& .MuiInputLabel-root': {
      color: 'black',
  }
};

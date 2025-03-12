import React, { useEffect, useState } from 'react';
import { useSubscriptionsStore } from '../../store/useSubscriptionsStore';
import { Box, TextField, IconButton, Button, Typography,styled, duration } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import { border, display, padding } from '@mui/system';

const Subscriptions = () => {
  const { subscriptions, getAllSubscriptions, modifySubscriptions, addSubscription } = useSubscriptionsStore();
  const [isEditingId, setIsEditingId] = useState(null); // Estado para controlar cuál subscripción está siendo editada
  const [editedSubscription, setEditedSubscription] = useState({});
  const [tenantId, setTenantId] = useState('');
  const [isCreatingSubscription, setIsCreatingSubscription] = useState(false);
    console.log(subscriptions);
    console.log(tenantId);
    console.log('editedSubscription',editedSubscription);
    console.log('isEditingId',isEditingId);
    console.log('isCreatingSubscription',isCreatingSubscription);
    
    
    
    
    
  // Obtener tenantId del token en las cookies
  useEffect(() => {
    const token = Cookies.get('token'); // Obtener el token desde las cookies
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decodificar el token
        console.log('decodedToken',decodedToken);
        
        setTenantId(decodedToken.TenantId); // Extraer tenantId del token decodificado
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
  }, []);

  // Obtener todas las subscripciones al cargar el componente
  useEffect(() => {
        if(tenantId){
            getAllSubscriptions(tenantId);
        }
       // getAllSubscriptions(tenantId);
    
   
  }, [getAllSubscriptions,tenantId]);

  // Manejar cambios en los textfields editables
  const handleFieldChange = (e, field) => {
    setEditedSubscription({
      ...editedSubscription,
      [field]: e.target.value,
    });
  };

  const handlecreate = () => {
    setIsCreatingSubscription(true);
    setEditedSubscription({duration:'',discount:''});

  };

  const handlesaveNewSubscription = async () => {
    const {duration,discount} = editedSubscription;
    console.log('duration desde funcion  ',duration);
    console.log('discount',discount);
    
    const newSubscription = await addSubscription(duration,discount,tenantId);
    await getAllSubscriptions(tenantId);
    setEditedSubscription({duration:'',discount:''});
    setIsCreatingSubscription(false);
  }
  // Guardar cambios de la subscripción
  const handleSaveChanges = async (subscriptionId) => {
    const updateData = {};
    
    // Solo agregar a updateData los campos que fueron modificados
    if (editedSubscription.duration !== undefined) updateData.duration = editedSubscription.duration;
    if (editedSubscription.discount !== undefined) updateData.discount = editedSubscription.discount;

    // Llamar a modifySubscriptions con solo los campos modificados
    await modifySubscriptions(subscriptionId, updateData, tenantId); // Ahora incluimos tenantId en la modificación
    
    setIsEditingId(null); // Desactivar edición una vez guardado
    setEditedSubscription({}); // Limpiar estado de edición
    getAllSubscriptions(tenantId); // Actualizar subscripciones en tiempo real
  };

  return (
    <MainContainer>
        <Typography sx={{color:'black', textAlign:'center'}}>Estas en subscripciones</Typography>
        <ContentContainer>
          {subscriptions.length === 0 ? (
            <Typography sx={{color: 'gray', textAlign: 'center', marginTop: '20px'}}>
              No hay subscripciones creadas aún
            </Typography>
          ) : (
            subscriptions.map((subscription) => (
              <SubscriptionContainer key={subscription.id} >
                <CustomTextfield
                  label="ID"
                  value={subscription.id}
                  InputProps={{
                    readOnly: true,
                  }}
                  margin="normal"
                />
                <CustomTextfield
                  label="Duration"
                  value={isEditingId === subscription.id ? editedSubscription.duration : subscription.duration}
                  onChange={(e) => handleFieldChange(e, 'duration')}
                  margin="normal"
                  disabled={isEditingId !== subscription.id}
                />
                <CustomTextfield
                  label="Discount"
                  value={isEditingId === subscription.id ? editedSubscription.discount : subscription.discount}
                  onChange={(e) => handleFieldChange(e, 'discount')}
                  margin="normal"
                  disabled={isEditingId !== subscription.id}
                />
                {isEditingId !== subscription.id ? (
                  <IconButton onClick={() => {
                    setIsEditingId(subscription.id);
                    setEditedSubscription(subscription);
                  }}>
                    <EditIcon />
                  </IconButton>
                ) : (
                  <ModalButtonContainer>
                    <StyledButton variant="contained" onClick={() => handleSaveChanges(editedSubscription.id)}>
                      Guardar
                    </StyledButton>
                    <CancelButton variant="contained" onClick={() => setIsEditingId(null)}>
                      Cancelar
                    </CancelButton>
                  </ModalButtonContainer>
                )}
              </SubscriptionContainer>
            ))
          )}

          {isCreatingSubscription ? (
            <NewSubscriptionFormContainer>
              <Typography variant="h5" align="center">Nueva subscripción</Typography>
              <TextField
                fullWidth
                id="duration"
                name="duration"
                label="Duración"
                value={editedSubscription.duration}
                onChange={(e) => handleFieldChange(e, 'duration')}
              />
              <TextField
                fullWidth   
                id="discount"
                name="discount"
                label="Descuento"
                value={editedSubscription.discount}
                onChange={(e) => handleFieldChange(e, 'discount')}
              />
              <ModalButtonContainer>
                <StyledButton variant="contained" onClick={handlesaveNewSubscription}>
                  Guardar
                </StyledButton>
                <CancelButton variant="contained" onClick={() => setIsCreatingSubscription(false)}>
                  Cancelar
                </CancelButton>
              </ModalButtonContainer>
            </NewSubscriptionFormContainer>
          ) : (
            <Button variant="contained" onClick={handlecreate}>Nueva subscripción</Button>
          )}
        </ContentContainer>
    </MainContainer>
  );
};

export default Subscriptions;

const MainContainer = styled(Box)(({ theme }) => ({
    width: '100vw',
    minHeight: '100vh',
    padding: '15px',
    boxSizing: 'border-box',
    // display: 'flex',
    // flexDirection: 'column',
   //  alignItems: 'center',
    backgroundColor: 'white',
  
    [theme.breakpoints.up('md')]: {
      width: 'calc(100vw - 240px)',
      minHeight:'calc(100vh - 54px)',
      marginTop: '54px',
      marginLeft: '240px',
      display:'flex',
      flexDirection:'column',
      padding:'15px',
      alignItems: 'center',
      
      justifyContent:'space-between',
      //backgroundColor:'white'
     
      //justifyContent: 'space-around',
    },
  }));

  const ContentContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    minHeight: '100%',
    //padding: '15px',
    boxSizing: 'border-box',
    // display: 'flex',
    // flexDirection: 'column',
   // alignItems: 'center',
    backgroundColor: 'white',
  
    [theme.breakpoints.up('md')]: {
      width: '50%',
      minHeight:'100vh',
    //   marginTop: '54px',
    //   marginLeft: '240px',
     flexDirection:'column',
      padding:'15px',
      
      justifyContent:'space-between',
      backgroundColor:'white'
     
      //justifyContent: 'space-around',
    },
  }));

  const SubscriptionContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    minHeight: '100%',
    //padding: '15px',
    boxSizing: 'border-box',
    // display: 'flex',
    // flexDirection: 'column',
   // alignItems: 'center',
    backgroundColor: 'white',
  
    [theme.breakpoints.up('md')]: {
      width: '100%',
      minHeight:'auto',
        display:'flex',
     flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
      padding:'0',
     
      //justifyContent:'space-between',
      backgroundColor:'white'
     
      //justifyContent: 'space-around',
    },
  }));

  const CustomTextfield = styled(TextField)(({ theme }) => ({
    width: '100%',
    minHeight: 'auto',
    //padding: '15px',
    boxSizing: 'border-box',
    //display: 'flex',
    // flexDirection: 'column',
   // alignItems: 'center',
    backgroundColor: 'white',
  
    [theme.breakpoints.up('md')]: {
      width: '20%',
      minHeight:'auto',
    //   marginTop: '54px',
    //   marginLeft: '240px',
     flexDirection:'row',

      padding:'0',
      //justifyContent:'space-between',
      backgroundColor:'white'
     
      //justifyContent: 'space-around',
    },
  }));

  const NewSubscriptionFormContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    minHeight: '100%',
    //padding: '15px',
    boxSizing: 'border-box',
    // display: 'flex',
    // flexDirection: 'column',
   // alignItems: 'center',
    backgroundColor: 'white',
  
    [theme.breakpoints.up('md')]: {
      width: '50%',
      minHeight:'100vh',
    //   marginTop: '54px',
    //   marginLeft: '240px',
     flexDirection:'column',
      padding:'15px',
      
      justifyContent:'space-between',
      backgroundColor:'white'
     
      //justifyContent: 'space-around',
    },
  }));


//   const TextfieldContainer = styled(Box)(({ theme }) => ({
//     width: '100%',
//     minHeight: 'auto',
//     //padding: '15px',
//     boxSizing: 'border-box',
//     //display: 'flex',
//     // flexDirection: 'column',
//    // alignItems: 'center',
//     backgroundColor: 'white',
  
//     [theme.breakpoints.up('md')]: {
//       width: '100%',
//       minHeight:'auto',
//     //   marginTop: '54px',
//     //   marginLeft: '240px',
//      flexDirection:'row',

//       padding:'0',
//       //justifyContent:'space-between',
//       backgroundColor:'white'
     
//       //justifyContent: 'space-around',
//     },
//   }));

  const ModalButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
     gap:'10px',
    // marginTop:'30px'
});

const StyledButton = styled(Button)({
    background: 'linear-gradient(45deg, #C004FF, #730399)',
     color: 'white',
 });

 const CancelButton = styled(Button)({
    background: 'linear-gradient(90deg, #4d4d4d, #b3b3b3)',
    color: 'white',
});

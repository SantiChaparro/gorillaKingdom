const {createTemporaryTenant,mpPaymentDetails,updateTemporaryTenant,createtmporaryPayment,findPendingPayment,newTenantPayment} = require('../controllers/mercadoPagoControllers');
//const {createTenantPayment} = require('../controllers/tenantPaymentsControllers');
const { MercadoPagoConfig, Preference } = require('mercadopago'); // Importa MercadoPagoConfig y Preference
const { tenantsPayments } = require('../functions/tenantsPayments');
require('dotenv').config();

const { MERCADO_PAGO_ACCES_TOKEN,MERCADO_TEST_TOKEN } = process.env;

// Crear una nueva instancia de MercadoPagoConfig con el token de acceso
const client = new MercadoPagoConfig({
  accessToken: MERCADO_TEST_TOKEN, 
});

const createPreference = async(req,res) => {

    const values = req.body;
   // console.log(values);
    
    
    const preferencesArray = [];
   preferencesArray.push(values.plan);

 //  console.log(preferencesArray);
    
    

     const items = preferencesArray.map((item) => ({
        title: item.name,
        quantity: 1,
        unit_price: item.price,
      }));
    
      // Creamos una instancia de Preference
      const preference = new Preference(client);
      
    

    try {
        const response = await preference.create({
            body: {
              items, // Asignamos los items que creamos antes
              back_urls: {
                success: "https://gympall.onrender.com/tenant-payment/success",
                //success: "http://localhost:3001/tenant-payment/success",  // URL de éxito local
                failure: "https://gympall.onrender.com/tenant-payment/failure",  // URL de fallo
                pending: "https://gympall.onrender.com/tenant-payment/pending",  // URL de pendiente
              },
              auto_return: "approved", // Opción de auto-retorno
            },
          });
      
          // Aquí obtenemos la ID de la preferencia creada
         // const init_point = response.sandbox_init_point;
          const init_point = response.init_point;

          // console.log("Preferencia creada con éxito:", init_point);
          // console.log('respuesta',response.id);
          // console.log('desde el handler plan',values.plan);
          // console.log('desde el hanlder planid',values.plan.id);
          // console.log('desde createpreference response',response);
          
          
          

          if(response.id){
            const newTemporarytenant = await createTemporaryTenant(values.dni,values.nombre,values.telefono,values.mail,values.rol,values.password,values.plan.id,response.id);
          }


          
      
          res.status(200).json({ init_point });
    } catch (error) {
        console.error("Error al crear la preferencia:", error);
    res.status(500).json({ message: "Error al crear la preferencia", error });
    }

};

const successHandler = async(req,res) => {
    const { payment_id, status, merchant_order_id, preference_id } = req.query;
    console.log('querys desde succeshandler',req.query);
   // console.log('body desde succeshandler',req.body);
    

    try {

     // console.log('ID de Pago:', payment_id);
      const paymentDetails = await mpPaymentDetails(payment_id);
      const tenantUpdated = await updateTemporaryTenant(preference_id,paymentDetails)
    //  console.log('desde successHandler',tenantUpdated);
      
     // console.log('desde successhandler',paymentDetails);
   
    const redirectUrl = `https://gympall.vercel.app/success?payment_id=${payment_id}&status=${status}&merchant_order_id=${merchant_order_id}&preference_id=${preference_id}`;
    //const redirectUrl = `http://localhost:3000/success?payment_id=${payment_id}&status=${status}&merchant_order_id=${merchant_order_id}&preference_id=${preference_id}`;
    
    res.redirect(redirectUrl);
    

    } catch (error) {
      console.log(error)
    }

    

};

const pendingHandler = async(req,res) => {
  const { payment_id, status, merchant_order_id, preference_id } = req.query;
 // console.log('querys pendinghandler',req.query);
 // console.log('body desde succeshandler',req.body);
  

  try {

  //  console.log('ID de Pago:', payment_id);
    const paymentDetails = await mpPaymentDetails(payment_id);
  //  console.log('desde pendinghandler',paymentDetails);
    
    const temporaryPayment = await createtmporaryPayment(payment_id,status,paymentDetails.transaction_amount,preference_id);
   
    
 
  const redirectUrl = `http://localhost:3000/pending?payment_id=${payment_id}&status=${status}&merchant_order_id=${merchant_order_id}&preference_id=${preference_id}`;
  
  res.redirect(redirectUrl);
  

  } catch (error) {
    console.log(error)
  }

  

};

const failHandler = async(req,res) => {
  const { payment_id, status, merchant_order_id, preference_id } = req.query;
 // console.log('querys desde failhandler',req.query);
 // console.log('body desde succeshandler',req.body);
  

  try {

    console.log('ID de Pago:', payment_id);
    
    const redirectUrl = `http://localhost:3000/failure?payment_id=${payment_id}&status=${status}&merchant_order_id=${merchant_order_id}&preference_id=${preference_id}`;
  
    res.redirect(redirectUrl);
  

  } catch (error) {
    console.log(error)
  }

  

};

const webHook = async (req,res) => {
  
  const paymentData = req.body.data;  
   

  console.log('Datos del webhook recibido:', paymentData);
   const paymentId = paymentData.id; 

   const paymentDetails = await mpPaymentDetails(paymentId);
   console.log('detalles del pago desde webhook',paymentDetails);

   const currentStatus = paymentDetails.status;

   const temporaryPayment = await findPendingPayment(paymentId,currentStatus);
  // console.log(temporaryPayment);
   

   if(temporaryPayment && currentStatus === 'approved'){
   // console.log(('desde wenhook',temporaryPayment));
   

    const newPayment = await newTenantPayment(paymentDetails.id,paymentDetails.status,paymentDetails.transaction_amount,temporaryPayment.TemporaryTenantId);

   // console.log(newPayment);
    
    
   }

   
   

   

   
  res.status(200).send('Notification received');

};

module.exports = {createPreference,successHandler,failHandler,pendingHandler,webHook}
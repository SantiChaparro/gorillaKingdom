const axios = require('axios');
require('dotenv').config(); // Asegúrate de llamar a dotenv.config() al principio

// Reemplaza con tu access_token de Mercado Pago desde el archivo .env
// const accessToken = process.env.MERCADO_TEST_TOKEN; // Accede a la variab
const accessToken = "APP_USR-5983609490364166-011712-e97c699ec3e236b870d2e37581a32dc9-2213887143";
console.log(accessToken);

const {TemporaryTenants,Tenants,Plans,TenantsPayments,TemporaryPayments,User} = require('../db');
//const {hashpassword} = require ('../functions/hasPassword');
const {hashPassword} = require('../functions/hasPassword');
const { where } = require('sequelize');


const createTemporaryTenant = async(dni,nombre,telefono,mail,rol,password,planId,preferenceId) => {
    console.log('planid antes del create',planId);
    
    try {
        const newTemporaryTenant = await TemporaryTenants.create({dni,nombre,telefono,mail,rol,password,planId,preferenceId});
        console.log('planid desde controller',planId);
        
        if(newTemporaryTenant){
            return {
                newTemporaryTenant,
                message: 'temporaryTenant creado con exito'
            }
        }

    } catch (error) {
        console.log(error);
    }


};



const mpPaymentDetails = async (paymentId) => {
  console.log('id pago desde mpPaymentDetails:', paymentId);
  
  if(paymentId !== null && paymentId !== undefined){
    try {
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        method: 'GET',
        
        headers: {
         // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      
      // Verificamos si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      // Convertimos la respuesta en formato JSON
      const paymentDetails =  await response.json();
      console.log('Detalles del pago:', paymentDetails);
  
      // Si necesitas extraer un monto u otra propiedad, puedes hacerlo aquí
      const amount = paymentDetails.transaction_amount; // Ejemplo de monto
      console.log('Monto del pago:', amount);
  
      return paymentDetails;
    } catch (error) {
      console.error('Error al obtener detalles del pago:', error);
      throw error;
    }
  }
  
};

const updateTemporaryTenant = async (preferenceId,paymentDetails) => {


  try {
    const temporaryTenant = await TemporaryTenants.findOne({where:{
      preferenceId
    }})
    const {dni,nombre,telefono,mail,rol,password,activo,planId} = temporaryTenant;
    console.log(temporaryTenant);
    
    
    const hashedPassword = await hashPassword(password);

    if(temporaryTenant){
      const newTenant = await Tenants.create({dni,nombre,telefono,mail,rol,password:hashedPassword,activo});

      if(newTenant){
        const tenantPlan = await Plans.findByPk(planId);
        if(tenantPlan){
          await newTenant.setPlan(tenantPlan);
        };

        await temporaryTenant.destroy();

      };

      const newTenantPayment = await TenantsPayments.create({
        paymentId:paymentDetails.id,
        amount:paymentDetails.transaction_details.total_paid_amount,
        status:paymentDetails.status,
        paymentDate:paymentDetails.date_approved})


        const tenant = await Tenants.findByPk(newTenant.id)

        if(newTenantPayment){
          await newTenantPayment.setTenant(tenant);
          await User.create({
            dni,
            nombre,
            telefono,
            mail,
            rol,
            password:hashedPassword,
            activo,
            TenantId:tenant.id
          })

        }
        return tenant;
    } ;

     
  
    } catch (error) {
    console.log(error);
    
  }
  
};

const createtmporaryPayment = async (payment_id,status,amount,preference_id) => {
  console.log('desde create temporary payment controller',payment_id,status,amount,preference_id);
  
  try {
    const newTemporaryPayment = await TemporaryPayments.create({payment_id,status,amount});
    if(newTemporaryPayment){
      const temporaryTenant = await TemporaryTenants.findOne({where:{ preferenceId:preference_id}});
      newTemporaryPayment.setTemporaryTenant(temporaryTenant);
      return {
        newTemporaryPayment,
        message: 'TemporaryPayment creado con exito'
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const findPendingPayment = async (paymentId,currentStatus) => {

  const temporaryPayment = await TemporaryPayments.findOne({
    where: { 
      payment_id: paymentId, 
      status: 'in_process' 
    },
  });

  return temporaryPayment;

};

const newTenantPayment = async (payment_id, status, amount, TemporaryTenantId) => {
  // Buscar el Tenant temporal
  const Tenant = await TemporaryTenants.findByPk(TemporaryTenantId);
  if (Tenant) {
    const { dni, nombre, telefono, mail, rol, password, activo, planId } = Tenant;
    const hashedPassword = await hashPassword(password);

    // Crear el nuevo Tenant
    const newTenant = await Tenants.create({
      dni,
      nombre,
      telefono,
      mail,
      rol,
      password: hashedPassword,
      activo,
      PlanId: planId
    });

    // Si el Tenant fue creado, crear el nuevo pago
    if (newTenant) {
      const newTenantPayment = await TenantsPayments.create({
        paymentId: payment_id,
        status: status,
        amount: amount,
        paymentDate: new Date(),
        TenantId: newTenant.id  // Asociamos el Tenant con el pago
      });

      // Verificar si se creó el pago
      if (newTenantPayment) {
        await User.create({
          dni,
          nombre,
          telefono,
          mail,
          rol,
          password: hashedPassword,
          activo,
          TenantId: newTenant.id
          
        })
      }
      
      return newTenant;
    }
  }

  return null;  // Si no se encontró el Tenant temporal, retornamos null
};



module.exports = {createTemporaryTenant,mpPaymentDetails,updateTemporaryTenant,createtmporaryPayment,findPendingPayment,newTenantPayment};
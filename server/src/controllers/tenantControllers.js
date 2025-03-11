const bcrypt = require('bcryptjs');
const { User,Tenants,UserTenantRoutine } = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {hashPassword} = require('../functions/hasPassword');
const {tenantsPayments} = require('../functions/tenantsPayments');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const createNewTenant = async (dni,nombre,telefono,mail,rol,password,plan) => {
    console.log('desde controller', dni);
    console.log(password);
    
    // const productos = [
    //     { name: "Producto 1", quantity: 2, price: 100 },
    //     { name: "Producto 2", quantity: 1, price: 200 },
    //   ];

    try {
        const hashedPassword = await hashPassword(password)
        console.log(hashedPassword);
        console.log(nombre);

         const existingTenant = await Tenants.findOne({ where: { dni } });
        if (existingTenant) {
            return {
                success: false,
                message: 'El tenant con este DNI ya existe'
            };
        }
        const newTenant = await Tenants.create({dni,nombre,telefono,mail,rol,password:hashedPassword,plan})

             if(newTenant){
                 const newUser = await User.create({dni,nombre,telefono,mail,rol,password:hashedPassword,TenantId:newTenant.id})
                 
                 if (newUser){
                    await UserTenantRoutine.create({dni:newUser.dni,TenantId:newTenant.id,RoutineId:null})
                 }
             }
        
    } catch (error) {
        return{
            error,
            errorMessage:`error, ${error.message}`
        }
    }
};

module.exports = { createNewTenant };
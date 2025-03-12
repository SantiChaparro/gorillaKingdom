const bcrypt = require('bcryptjs');
const { User,Tenants,UserTenantRoutine} = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const {PaymentVerificationController} = require('./PaymentVerificationController');

const verifyUser = async (dni, password) => {
    console.log('desde controller', dni);
    console.log('desde controller', password);

    try {
        // Buscar al usuario por su dni
        const user = await User.findByPk(dni);

        if (!user) {
            // Si no existe el usuario, devolver un mensaje adecuado
            console.log('Usuario no encontrado');
            return { success: false, message: 'Usuario no encontrado' };
        }

        console.log(dni);
        console.log('desde loggincontroller', user);

        // Comparar la contraseña ingresada con el hash almacenado
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            console.log('Contraseña correcta');

            // Primero verifico si es un usuario o un tenant
            const tenant = await Tenants.findOne({
                where: {
                    dni: user.dni
                }
            });
            
            if (tenant) {
                // Si el usuario es un tenant, generar el token
                const token = jwt.sign({ user, rol: user.rol, TenantId: tenant.id }, jwtSecretKey, { expiresIn: '1h' });
                const decoded = jwt.verify(token, jwtSecretKey);
                return { success: true, message: 'Contraseña correcta', user, decoded, token };
            } else {

                PaymentVerificationController();
                // Si el usuario tiene varios tenants, procesar la relación con cada uno
                const tenants = await UserTenantRoutine.findAll({
                    where: {
                        UserDni: user.dni
                    }
                });

                // Crear un array para los datos de los tenants
                const tenantsData = [];

                // Fetch tenants data
                await Promise.all(tenants.map(async (tenant) => {
                    const userTenant = await Tenants.findByPk(tenant.TenantId);
                    console.log(tenant.TenantId);
                    console.log('tenant', userTenant);

                    if (userTenant) {
                        tenantsData.push(userTenant);
                    }
                }));

                // Una vez que todos los datos de los tenants se han recogido, generar el token
                const token = jwt.sign({ user, rol: user.rol, tenantsData }, jwtSecretKey, { expiresIn: '1h' });
                const decoded = jwt.verify(token, jwtSecretKey);


               
                return { success: true, message: 'Contraseña correcta', user, decoded, token };
            }
        } else {
            // Si la contraseña no coincide
            console.log('Contraseña incorrecta');
            return { success: false, message: 'Contraseña incorrecta' };
        }
    } catch (error) {
        // Manejo de errores
        console.error('Error al verificar el usuario:', error);
        return { success: false, message: 'Error del servidor' };
    }
};


module.exports = { verifyUser };
const bcrypt = require('bcryptjs');
const { User } = require('../db');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

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

        // Comparar la contraseña ingresada con el hash almacenado
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            // Si la contraseña coincide
          //  console.log('La contraseña es correcta');
            const token = jwt.sign({ user, rol:user.rol }, jwtSecretKey, { expiresIn: '1h' });
            return { success: true, message: 'Contraseña correcta', user,token };
            // y genera el token

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
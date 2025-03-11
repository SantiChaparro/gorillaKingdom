const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization'];
    console.log('token desde authenticationtoken',token);
    console.log('req.cookies desde auth',req.cookies);
    
    if (!token) {
        return res.status(403).json({ message: 'Token is required' });
    }

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        
        req.user = decoded;  // Almacenar el decoded en el request para que esté disponible en la siguiente función
        next();
    });
};

module.exports = { authenticateToken };

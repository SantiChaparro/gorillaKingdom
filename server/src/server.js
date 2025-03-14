const express = require("express");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const server = express();

server.use(cookieParser())
server.use(morgan("dev"));
server.use(express.json());

const allowedOrigins = [
    'http://localhost:3000',  // Origen del frontend en desarrollo
    'https://gympall.vercel.app'  // Origen del frontend en producción
];

server.use(cors({
    origin: function (origin, callback) {
        // Permite solicitudes de los orígenes listados o sin origen (para herramientas como Postman)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,  // Permite el envío de cookies
}));

server.use('/',router);

module.exports = server;
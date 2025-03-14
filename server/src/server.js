const express = require("express");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const server = express();

server.use(cookieParser());
server.use(morgan("dev"));
server.use(express.json());

// Lista de dominios permitidos
const allowedOrigins = [
    'http://localhost:3000',  // Desarrollo
    'https://gympall.vercel.app',  // Producción
    'https://gorilla-kingdom-a63hg162r-santiago-chaparros-projects.vercel.app'  // Otro subdominio de Vercel
];

server.use(cors({
    origin: function (origin, callback) {
        // Permitir orígenes en la lista o sin origen (para herramientas como Postman)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            console.log(`CORS permitido para el origen: ${origin}`);
            callback(null, true);
        } else {
            console.log(`CORS bloqueado para el origen: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,  // Permitir envío de cookies
}));

server.use('/', router);

module.exports = server;

const express = require("express");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require('cookie-parser');

const server = express();

server.use(cookieParser())
server.use(morgan("dev"));
server.use(express.json());
server.use(cors({
    origin: 'http://localhost:3000',  // Asegúrate de que el frontend esté permitido
    credentials: true,  // Permite el envío de cookies
}));
server.use('/',router);

module.exports = server;
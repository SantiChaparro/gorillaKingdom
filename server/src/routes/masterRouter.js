const {Router} = require("express");

//aca importo los handlers
const { postUser , getUsers} = require('../handlers/masterHandlers');

const masterRouter = Router();

// aca vienen las rutas

masterRouter.post('/',postUser);
masterRouter.get('/',getUsers)

module.exports = masterRouter;
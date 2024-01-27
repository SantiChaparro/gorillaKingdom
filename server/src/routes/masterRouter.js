const {Router} = require("express");

//aca importo los handlers
const { postUser , getUsers, getUserByName, getUserById,postPayment, postRoutine} = require('../handlers/masterHandlers');

const masterRouter = Router();

// aca vienen las rutas

masterRouter.post('/',postUser);
masterRouter.get('/',getUsers)
masterRouter.get('/search',getUserByName)
masterRouter.get('/:dni',getUserById)
masterRouter.post('/payment',postPayment)
masterRouter.post('/routine',postRoutine);
module.exports = masterRouter;
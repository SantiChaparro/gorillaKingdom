const {Router} = require("express");

//aca importo los handlers
const { postUser , getUsers,postPayment, postRoutine,updateUser,updateRoutine} = require('../handlers/masterHandlers');

const masterRouter = Router();

// aca vienen las rutas

masterRouter.post('/',postUser);
masterRouter.get('/',getUsers)
masterRouter.get('/:dni', getUsers);
masterRouter.get('/search',getUsers);
masterRouter.post('/payment',postPayment)
masterRouter.post('/routine',postRoutine);
masterRouter.patch('/updateUser/:dni',updateUser)
masterRouter.patch('/updateRoutine/:dni',updateRoutine)

module.exports = masterRouter;
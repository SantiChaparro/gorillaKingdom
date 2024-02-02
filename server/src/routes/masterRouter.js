const {Router} = require("express");

//aca importo los handlers
const { postUser,
        getUsers,
        postPayment, 
        postRoutine,
        updateUser,
        updateRoutine,
        getPayments,
        getExercises,
        createExercise
    } = require('../handlers/masterHandlers');

const masterRouter = Router();

// aca vienen las rutas
masterRouter.get('/findExercises',getExercises);
masterRouter.get('/findUsers',getUsers)

masterRouter.get('/search',getUsers);
masterRouter.post('/payment',postPayment)
masterRouter.post('/routine',postRoutine);
masterRouter.patch('/updateUser/:dni',updateUser);
masterRouter.patch('/updateRoutine/:dni',updateRoutine);
masterRouter.get('/payment/:month',getPayments);
masterRouter.post('/createExercise',createExercise);
masterRouter.get('/usersDetail/:dni', getUsers);
masterRouter.post('/',postUser);

module.exports = masterRouter;
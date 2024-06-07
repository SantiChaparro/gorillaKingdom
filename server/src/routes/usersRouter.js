const {Router} = require("express");

//aca importo los handlers
const {getRoutineById,updateRoutine} = require('../handlers/usersHandlers')

const usersRouter = Router();

usersRouter.get('/routine/:dni',getRoutineById)
usersRouter.patch('/updateRoutine/:id',updateRoutine)



module.exports = usersRouter;
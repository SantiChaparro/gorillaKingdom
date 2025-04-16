const {Router} = require("express");

//aca importo los handlers
const {getRoutineById,updateRoutine,getDuesDates} = require('../handlers/usersHandlers')

const usersRouter = Router();

usersRouter.get('/routine/:dni',getRoutineById)
usersRouter.patch('/updateRoutine/:id',updateRoutine)
usersRouter.get('/users/:dni/tenant/:tenantId/due-dates',getDuesDates)



module.exports = usersRouter;
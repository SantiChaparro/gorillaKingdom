const {Router} = require("express");

//aca importo los handlers
const {getRoutineById} = require('../handlers/usersHandlers')

const usersRouter = Router();

usersRouter.get('/routine',getRoutineById)



module.exports = usersRouter;
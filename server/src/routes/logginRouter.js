const {Router} = require("express");

const {postLoggin} = require('../handlers/logginHandlers');


const logginRouter = Router();

logginRouter.post('/postLoggin',postLoggin)


module.exports = logginRouter;
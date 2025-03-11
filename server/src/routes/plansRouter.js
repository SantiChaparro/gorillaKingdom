const {Router} = require("express");

const {getPlans} = require('../handlers/plansHanldres');

const plansRouter = Router();

plansRouter.get('/plans',getPlans)


module.exports = plansRouter;
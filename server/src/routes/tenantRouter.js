const {Router} = require("express");

const {postTenant} = require('../handlers/tenantHandlers');


const tenantRouter = Router();

tenantRouter.post('/postTenant',postTenant)


module.exports = tenantRouter;
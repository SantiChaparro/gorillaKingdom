const {Router} = require("express");
const mercadoPagoRouter = Router();

const {createPreference,successHandler,failHandler,pendingHandler,webHook} = require('../handlers/mercadoPagoHandlers');

mercadoPagoRouter.post('/create-preference',createPreference)
mercadoPagoRouter.get('/success',successHandler);
mercadoPagoRouter.get('/failure',failHandler);
mercadoPagoRouter.get('/pending',pendingHandler);
mercadoPagoRouter.post('/webHook',webHook);



module.exports = mercadoPagoRouter;
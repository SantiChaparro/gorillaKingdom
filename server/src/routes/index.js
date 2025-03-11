const {Router} = require('express');
// aca debo importar 
const tenantRouter = require('./tenantRouter');
const usersRouter = require('./usersRouter');
const masterRouter = require('./masterRouter');
const logginRouter = require('./logginRouter');
const mercadoPagoRouter = require('./mercadoPagoRouter');
const plansRouter = require('./plansRouter');

const router = Router();

// aca debo hacer que pase por las diferentes rutas
router.use('/newTenant',tenantRouter);
router.use('/loggin',logginRouter);
router.use('/user',usersRouter);
router.use('/master',masterRouter);

router.use('/tenant-payment',mercadoPagoRouter);

router.use('/plans-router',plansRouter);

module.exports = router;
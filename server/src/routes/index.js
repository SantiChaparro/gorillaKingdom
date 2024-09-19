const {Router} = require('express');
// aca debo importar 
const usersRouter = require('./usersRouter');
const masterRouter = require('./masterRouter');
const logginRouter = require('./logginRouter');

const router = Router();

// aca debo hacer que pase por las diferentes rutas
router.use('/loggin',logginRouter);
router.use('/user',usersRouter);
router.use('/master',masterRouter);

module.exports = router;
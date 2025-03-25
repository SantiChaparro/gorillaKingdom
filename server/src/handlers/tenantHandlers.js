const {createNewTenant} = require('../controllers/tenantControllers');

const postTenant = async(req,res) => {
    const {dni,nombre,telefono,mail,rol,password,plan} = req.body;
   
    try {
        const response = await createNewTenant(dni,nombre,telefono,mail,rol,password,plan);
       // console.log(response);
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).send(error)
    }
    
};

module.exports = {postTenant};
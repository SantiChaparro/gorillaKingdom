
const {verifyUser} = require('../controllers/logginControllers');

const postLoggin = async(req,res) => {
    const {dni,password} = req.body;
    console.log(password);
    console.log(dni);
    

    try {
        const verifiedUser = await verifyUser(dni,password);
        console.log(verifiedUser);
        
        res.status(200).json(verifiedUser);
    } catch (error) {
        res.status(500).send(error)
    }
    
};

module.exports = {postLoggin};
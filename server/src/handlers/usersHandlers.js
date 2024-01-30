const {getRoutineByUserId} = require('../controllers/userControllers');

const getRoutineById = async (req,res)=>{

    const {dni} = req.body;
    console.log(dni)

    try {
        const routine = await getRoutineByUserId(dni);
        res.status(200).json(routine);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {getRoutineById};

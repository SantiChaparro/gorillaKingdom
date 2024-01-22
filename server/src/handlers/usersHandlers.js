const {getRoutineByUserId} = require('../controllers/userControllers');

const getRoutineById = async (req,res)=>{

    const {id} = req.body;

    try {
        const routine = await getRoutineByUserId(id);
        res.status(200).json(routine);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = {getRoutineById};

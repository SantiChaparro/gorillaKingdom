const {getRoutineByUserId,modifyRoutine} = require('../controllers/userControllers');

const getRoutineById = async (req,res)=>{

    console.log('req.query desde getroutine',req.query);
    
    const {dni} = req.params;
    const {userTenants} = req.query;
    console.log('dni desde handler',dni)
    console.log('selectedTenant desde handler',userTenants);
    

    try {
        const routine = await getRoutineByUserId(dni,userTenants);
        res.status(200).json(routine);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const updateRoutine = async (req, res) => {
    const { updateData } = req.body;
    const { id } = req.params;
    console.log(req.params);
    
    
    console.log('id desde el handler', id);
    console.log('obj updatedata desde el handler', updateData);

    try {
        const updatedRoutine = await modifyRoutine(id, updateData);
        res.status(200).json({
            successMessage: "Routine updated successfully",
            data: updatedRoutine
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
module.exports = {getRoutineById,updateRoutine};

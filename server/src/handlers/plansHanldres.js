const {getAllPlans} = require('../controllers/plansControllers');

const getPlans = async(req,res) => {

try {
    const plans = await getAllPlans();
    res.status(200).json(plans);
} catch (error) {
    res.status(500).send(error);
}

};

module.exports = {getPlans};
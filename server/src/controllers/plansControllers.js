const {Plans} = require('../db');


const getAllPlans = async() => {

try {
    const plans = await Plans.findAll();
    return plans
} catch (error) {
    console.log(error);
    throw error;
}


};

module.exports = {getAllPlans};
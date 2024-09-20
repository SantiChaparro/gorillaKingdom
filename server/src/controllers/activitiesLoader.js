const activities = require('../mockups/activities.json');
console.log(activities);

const { Activity } = require('../db');

const activityLoader = async () => {
    const activity = activities.activities.map((item)=>{
        return {
            nombre:item.nombre,
            costo:item.costo
        }
    });

    const loadActivities = await Activity.bulkCreate(activity);

    return loadActivities;
};

module.exports = activityLoader
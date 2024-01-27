const daysOfWeek = require('../mockups/daysOfWeekMockUp.json');

const { DayOfWeek } = require('../db');

const daysLoader = async () => {
    const day = daysOfWeek.days.map((item)=>{
        return {
            id: item.id
        }
    });

    const loadDays = await DayOfWeek.bulkCreate(day);

    return loadDays;
};

module.exports = daysLoader
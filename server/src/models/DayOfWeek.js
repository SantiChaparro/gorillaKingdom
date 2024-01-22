const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('DayOfWeek',{

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }
    })
};
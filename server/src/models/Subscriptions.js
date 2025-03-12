const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('Subscriptions',{

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        duration:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        discount:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
    })
};
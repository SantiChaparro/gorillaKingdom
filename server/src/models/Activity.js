const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('Activity',{

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        costo:{
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    })
};
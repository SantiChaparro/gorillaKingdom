const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('Routine',{

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        dias_por_semana:{
            type: DataTypes.INTEGER,
            allowNull:false,
        }
       
    })
};
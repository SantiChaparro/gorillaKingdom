const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('User',{

        dni:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha_nacimiento:{
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        mail:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isEmail: true,
             }
        },
        domicilio:{
            type: DataTypes.STRING,
            allowNull: false,
        } 
    })
};
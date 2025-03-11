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
            type: DataTypes.STRING,
            allowNull: true,
        },
        telefono:{
            type: DataTypes.STRING,
            allowNull: true,
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
            allowNull: true,
        },
        rol:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        activo:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        } 
    })
};
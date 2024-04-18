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
            allowNull: false,
        },
        telefono:{
            type: DataTypes.STRING,
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
        },
        rol:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        } 
    })
};
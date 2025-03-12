const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('Exercise',{

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        grupo_muscular:{
            type: DataTypes.ENUM('Pecho','Hombros','Brazos','Espalda','Core','Piernas','Gluteos'),
            allowNull: false,
        },
        descripcion:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        activo:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
};
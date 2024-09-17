const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('Posts',{

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titulo:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        subTitulo:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        cuerpo:{
          type: DataTypes.STRING,
          allowNull:true  
        },
        multimedia:{
            type: DataTypes.ARRAY(DataTypes.JSONB),
            allowNull: true
        }
       
    })
};
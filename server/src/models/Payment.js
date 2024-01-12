const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('User',{

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fecha_pago:{
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        monto:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        Comentario:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    })
};
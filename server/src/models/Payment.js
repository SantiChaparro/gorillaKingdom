const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('Payment',{

        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fecha_pago:{
            type: DataTypes.DATE,
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
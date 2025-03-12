const {DataTypes} = require("sequelize");


module.exports = (sequelize) => {

    sequelize.define('Payment',{

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
        medio_pago:{
            type: DataTypes.ENUM('Efectivo','Transferencia','Débito','Crédito'),
            allowNull: false
        },
        Comentario:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    })
};
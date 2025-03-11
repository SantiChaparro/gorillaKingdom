const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('TemporaryPayments', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        payment_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Asegura que el ID de pago sea único
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending', // Establece el valor por defecto como 'pending'
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        }
    }, {
      
        timestamps: true, // Crea las columnas `created_at` y `updated_at`
    });
};

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('TenantsPayments', {
    paymentId: {
      type: DataTypes.STRING,
      allowNull: false, // ID único del pago generado por Mercado Pago
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false, // Monto del pago
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false, // Estado del pago (approved, pending, failure)
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false, // Fecha de creación del pago
    },
   
  });
};

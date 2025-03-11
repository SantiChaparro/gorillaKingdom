const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const PaymentActivities = sequelize.define('PaymentActivities', {
        PaymentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Payments', // Nombre de la tabla de pagos
              key: 'id'
            }
          },
          ActivityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'Activities', // Nombre de la tabla de actividades
              key: 'id'
            }
          },
          fecha_vencimiento:{
            type: DataTypes.DATEONLY,
            allowNull: true,
          }
    });

   
};  

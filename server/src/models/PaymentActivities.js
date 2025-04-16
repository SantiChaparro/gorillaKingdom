const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PaymentActivities = sequelize.define('PaymentActivities', {
    PaymentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Payments',
        key: 'id'
      }
    },
    ActivityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Activities',
        key: 'id'
      }
    },
    fechaVencimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
       // Esto asegura que la columna se mapea como fecha_vencimiento
    }
  }, {
    // Esto asegura que se usen nombres de columna en snake_case
  });

  return PaymentActivities;
};




// const { DataTypes } = require('sequelize');

// module.exports = (sequelize) => {
//     const PaymentActivities = sequelize.define('PaymentActivities', {
//         PaymentId: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//               model: 'Payments', // Nombre de la tabla de pagos
//               key: 'id'
//             }
//           },
//           ActivityId: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//               model: 'Activities', // Nombre de la tabla de actividades
//               key: 'id'
//             }
//           },
//           fecha_vencimiento:{
//             type: DataTypes.DATEONLY,
//             allowNull: true,
//           }
//     });

   
// };  

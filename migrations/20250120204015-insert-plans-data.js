
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Plans', [
      {
        name: 'Plan Básico', // Nombre del primer plan
        price: 10.00, // Precio del plan
        description: 'Plan básico con acceso limitado a los servicios', // Descripción del plan
        createdAt: new Date(),
        updatedAt: new Date(),
      }, 
      {
        name: 'Plan Premium', // Nombre del segundo plan
        price: 25.00, // Precio del plan
        description: 'Plan premium con acceso completo a todos los servicios', // Descripción del plan
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Si necesitas revertir la migración, puedes eliminar estos registros
    await queryInterface.bulkDelete('Plans', null, {});
  }
};

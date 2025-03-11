// Example of a seeder file with prices
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Plans', [
      {
        name: 'Basic',
        description: 'Plan de entrenamiento básico',
        price: 1999, // Precio del plan (en moneda local)
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Premium',
        description: 'Plan de entrenamiento avanzado',
        price: 2999, // Precio del plan (en moneda local)
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Agrega más planes con sus respectivos precios
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Plans', null, {});
  }
};


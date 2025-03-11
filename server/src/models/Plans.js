// models/Plans.js
const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const Plans = sequelize.define('Plans', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    }, {
      timestamps: true // Sequelize gestionará los campos createdAt y updatedAt
    });
  
    return Plans;
  };
  
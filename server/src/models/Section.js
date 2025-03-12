const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define('Section', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        settings: {
            type: DataTypes.JSONB, // Cambio aquí
            allowNull: true
        }
    });
};
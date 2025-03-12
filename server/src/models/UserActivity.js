const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserActivities = sequelize.define('UserActivities', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        UserDni: {
            type: DataTypes.INTEGER,
          
        },
        ActivityId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Activities',
                key: 'id'
            }
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        isPaid: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    });

   
};  
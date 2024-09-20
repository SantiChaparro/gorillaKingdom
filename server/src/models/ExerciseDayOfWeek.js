const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ExerciseDayOfWeek = sequelize.define('ExerciseDayOfWeek', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        DayOfWeekId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'DayOfWeeks',
                key: 'id'
            }
        },
        ExerciseId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Exercises',
                key: 'id'
            }
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        RoutineId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

   
};  

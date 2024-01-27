const { User , Routine , Exercise , DayOfWeek } = require('../db');
const { Op } = require('sequelize');

const getRoutineByUserId = async (id) => {
    try {
        const user = await User.findByPk(id, {
            include: [{
                model: Routine,
                attributes: ['id'],
                include: [
                    {
                        model: DayOfWeek,
                        attributes: ['id'],
                        through: {
                            attributes: [],
                          },
                        include: [
                            {
                                model: Exercise,
                                attributes: ['nombre'],
                                through: {
                                    attributes: [],
                                  }
                            }
                        ]
                    }
                ]
            }],
            attributes: [] // Excluir todos los atributos del usuario
        });

        if (user) {
            console.log(user.Routine);
            return user.Routine;
        } else {
            console.log('Usuario no encontrado');
            return null;
        }
    } catch (error) {
        console.error('Error al obtener la rutina del usuario:', error);
        throw error;
    }
};

module.exports = {getRoutineByUserId};
const { User , Routine , Exercise , DayOfWeek ,ExerciseDayOfWeek} = require('../db');
const { Op } = require('sequelize');

const getRoutineByUserId = async (dni) => {
    try {
        const user = await User.findByPk(dni, {  // Cambié 'id' por 'dni' para que coincida con el parámetro
            include: [{
                model: Routine,
                attributes: ['id', 'routineDetail'],
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
                                attributes: ['nombre', 'id'],
                                through: {
                                    attributes: [],
                                }
                            }
                        ]
                    }
                ]
            }],
            attributes: [] 
        });

        if (user) {
        
            const routine = user.Routine;
            const routineId = user.Routine.id;  // Ajuste para acceder al ID de la rutina

            const filteredExercises = await ExerciseDayOfWeek.findAll({ // Cambio de 'ExerciseDayOfWeeks' a 'ExerciseDayOfWeek'
                where: {
                    RoutineId: routineId,
                    activo: true
                }
            });

            return { routine, filteredExercises }; // Ajuste en la estructura del objeto devuelto
        } else {
            console.log('Usuario no encontrado');
            return null;
        }
    } catch (error) {
        console.error('Error al obtener la rutina del usuario:', error);
        throw error;
    }
};






const modifyRoutine = async (routineId, updateData) => {
    console.log('desde controller', routineId);
    console.log('updatedata desde controller', updateData);

    try {
        const routine = await Routine.findByPk(routineId);
        if (!routine) {
            throw new Error("Routine not found");
        }

        let routineDetails = routine.routineDetail || [];
        console.log('routinedetail desde controller', routineDetails);

        // Eliminar duplicados
        const uniqueDetails = [];
        const seenIds = new Set();

        for (const detail of routineDetails) {
            if (!seenIds.has(detail.id)) {
                seenIds.add(detail.id);
                uniqueDetails.push(detail);
            }
        }

        routineDetails = uniqueDetails;

        // Actualizar los detalles de la rutina
        for (const exerciseId in updateData) {
            const exerciseUpdates = updateData[exerciseId];
            const exerciseIdNumber = parseInt(exerciseId, 10); // Asegúrate de que sea un número

            const detailIndex = routineDetails.findIndex(detail => detail.id === exerciseIdNumber);
            if (detailIndex !== -1) {
                // Si se encuentra el detalle, actualizarlo
                const detail = routineDetails[detailIndex];
                for (const weekIndex in exerciseUpdates) {
                    const load = exerciseUpdates[weekIndex];
                    detail.weights[weekIndex] = load;
                }
            } else {
                // Agregar el nuevo ejercicio si no existe
                routineDetails.push({
                    id: exerciseIdNumber,
                    weights: exerciseUpdates,
                    setsAndReps: 'Default value' // O el valor por defecto que necesites
                });
            }
        }

        console.log('routineDetails actualizados:', routineDetails);

        // Actualizar la rutina con los detalles actualizados
        await Routine.update(
            { routineDetail: routineDetails },
            { where: { id: routineId } }
        );

        return await Routine.findByPk(routineId); // Devolver la rutina actualizada
    } catch (error) {
        console.error(`Failed to update routine: ${error.message}`);
        throw new Error(`Failed to update routine: ${error.message}`);
    }
};

module.exports = { modifyRoutine };


module.exports = { modifyRoutine };


module.exports = {getRoutineByUserId,modifyRoutine};
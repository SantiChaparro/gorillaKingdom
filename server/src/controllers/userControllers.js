const { User , Routine , Exercise , DayOfWeek ,ExerciseDayOfWeek, UserTenantRoutine,UserActivities,Activity,PaymentActivities} = require('../db');
const { Op } = require('sequelize');

const getRoutineByUserId = async (dni, selectedTenant) => {
    try {

        const activities = await UserActivities.findAll({
            where:{
                UserDni: dni,
                activo: true,
                isPaid: false
            },
            include:[
                {
                    model: Activity,
                    as: 'activity',
                    where:{
                     TenantId: selectedTenant,
                    
                    }
                }
            ]
        });
      //  console.log('desde controller getroutinebyid', activities);
        

        if(activities.length >0){
            return {message: 'Pago pendiente', showAlert: true
            };
        }else{

               // Buscar la relación entre el usuario, el tenant, y la rutina
        const userRoutine = await UserTenantRoutine.findOne({  
            where: {
                UserDni: dni,
                TenantId: selectedTenant
            },
        });

        if (!userRoutine) {
            return { message: 'No se encontró la rutina para este usuario' };
        }

        // Obtener la rutina y sus días de la semana con los ejercicios asociados
        const routine = await Routine.findByPk(userRoutine.routineId, {
            include: [
                {
                    model: DayOfWeek,  // Relación con DayOfWeek
                    through: { attributes: [] }, // No necesitas atributos de la tabla intermedia
                    include: [
                        {
                            model: Exercise,  // Relación con los ejercicios
                            through: { attributes: [] }, // No necesitas atributos de la tabla intermedia ExerciseDayOfWeek
                        },
                    ],
                },
            ],
        });

        if (!routine) {
            return { message: 'No se encontró la rutina' };
        }

        // Filtrar los ejercicios activos para la rutina si es necesario
        const filteredExercises = await ExerciseDayOfWeek.findAll({ 
            where: {
                RoutineId: routine.id,  // Asegúrate de usar el id correcto
                activo: true,
            },
        });

      //  console.log('desde controller routine', routine);
      //  console.log('desde controller filteredExercises', filteredExercises);
        
        return { routine, filteredExercises };  // Retornar rutina y ejercicios filtrados



        }
        
     
    } catch (error) {
        console.error('Error al obtener la rutina del usuario:', error);
        throw error;
    }
};








const modifyRoutine = async (routineId, updateData) => {
  //  console.log('desde controller', routineId);
  //  console.log('updatedata desde controller', updateData);

    try {
        const routine = await Routine.findByPk(routineId);
        if (!routine) {
            throw new Error("Routine not found");
        }

        let routineDetails = routine.routineDetail || [];
       // console.log('routinedetail desde controller', routineDetails);

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

       // console.log('routineDetails actualizados:', routineDetails);

        // Actualizar la rutina con los detalles actualizados
        await Routine.update(
            { routineDetail: routineDetails },
            { where: { id: routineId } }
        );

        return await Routine.findByPk(routineId); // Devolver la rutina actualizada
    } catch (error) {
        //console.error(`Failed to update routine: ${error.message}`);
        throw new Error(`Failed to update routine: ${error.message}`);
    }
};

const getDuesDatesByUserId = async (dni, tenantId) => {
    try {
      const actividades = await UserActivities.findAll({
        where: {
          UserDni: dni,
          activo: true
        },
        include: [
          {
            model: Activity,
            as: 'activity',
            where: { TenantId: tenantId },
            attributes: ['nombre'],
            include: [
              {
                model: PaymentActivities,
                as: 'paymentActivities',
                attributes: ['fechaVencimiento'],
                required: false // Por si aún no tiene pagos
              }
            ]
          }
        ],
        attributes: [],
        logging: console.log
      });
  
      console.log('Fechas de vencimiento obtenidas:', actividades);
  
      const resultado = actividades.map((ua) => {
        const nombreActividad = ua.activity?.nombre || null;
        const primerPago = ua.activity?.paymentActivities?.[0]; // o con .find si tenés lógica adicional
  
        return {
          nombreActividad,
          fechaVencimiento: primerPago?.fechaVencimiento || null
        };
      });
  
      return resultado;
    } catch (error) {
      console.error('Error al obtener fechas de vencimiento:', error);
      return [];
    }
  };
  
  

module.exports = { modifyRoutine };


module.exports = { modifyRoutine };


module.exports = {getRoutineByUserId,modifyRoutine,getDuesDatesByUserId};
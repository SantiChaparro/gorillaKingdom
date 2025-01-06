const { User, Payment, Routine, DayOfWeek, Exercise, sequelize , ExerciseDayOfWeek , RoutineDayOfWeek,Posts,Section,Activity,UserActivities,PaymentActivities} = require('../db');
const { Sequelize, Op, where } = require('sequelize');
const {hashPassword} = require('../functions/hasPassword');

const postNewUser = async (dni,nombre,fecha_nacimiento,telefono,mail,domicilio,rol,password) => {

    const hashedPassword = await hashPassword(password);


    const newUser = await User.create({dni,nombre,fecha_nacimiento,telefono,mail,domicilio,rol,password:hashedPassword});

    return newUser;
};

const getAllUsers = async () => {
    const users = await User.findAll({
        order: [
            ['nombre', 'ASC'] 
    ]});
    return users;
};


const getUser = async (name) => {
    const user = await User.findAll({
        where: {
            nombre: {
                [Op.iLike]: `%${name}%`,
            },
        },
    });
    
    return user;
};

const getUserByPk = async (dni) => {
    console.log(dni);
    
   try {
    const user = await User.findByPk(dni, {
        include: [
            {
                model: Payment,
                attributes: ['fecha_pago', 'monto']
            },
            {
                model: Routine,
                attributes: ['id', 'routineDetail'],
                include: [
                    {
                        model: DayOfWeek,
                        attributes: ['id'],
                        through: {
                            attributes: []
                        },
                        include: [
                            {
                                model: Exercise,
                                attributes: ['nombre', 'id'],
                                through: {
                                    model: ExerciseDayOfWeek,
                                    where: { activo: true },
                                    attributes: []
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    });
    console.log(user);
    return user;
   } catch (error) {
    console.error('error desde controller', error);
    throw error;
   }
    
};

const newPayment = async (dni, fecha_pago , monto, medio_pago, activityIds ) => {

    try {
        const user = await User.findByPk(dni);  
        
        if (!user || user === null) {
           
            throw new Error('Usuario no encontrado');
        }

        const payment = await Payment.create({ fecha_pago, monto, medio_pago });
        
        if (!payment) {
          
            throw new Error('Error al crear el pago');
        }

        await user.addPayment(payment);

        for (let id of activityIds) {
            await PaymentActivities.create({ PaymentId: payment.id, ActivityId: id });
        }

        return payment; 
        
    } catch (error) {
       
        throw new Error(`Error al crear el pago: ${error.message}`);
    }
};



const createRoutine = async (routineObj) => {
    try {
        const userId = routineObj.userId;
        const user = await User.findByPk(userId);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        
        const newRoutine = await Routine.create();
        await user.setRoutine(newRoutine);

        const allDetails = [];

        for (const day of routineObj.days) {
            const dayId = parseInt(day.dayId);
            const foundDay = await DayOfWeek.findByPk(dayId);

            if (foundDay) {
                await newRoutine.addDayOfWeek(foundDay);

                const exerciseArray = day.exercisesId;
                if (exerciseArray && exerciseArray.length > 0) {
                    for (const exerciseId of exerciseArray) {
                        const foundExercise = await Exercise.findByPk(exerciseId);

                        if (foundExercise) {
                            // Verificar si ya existe un registro
                            const existingRecord = await ExerciseDayOfWeek.findOne({
                                where: {
                                    DayOfWeekId: dayId,
                                    ExerciseId: exerciseId,
                                    RoutineId: newRoutine.id
                                }
                            });

                            if (!existingRecord) {
                               
                                await ExerciseDayOfWeek.create({
                                    DayOfWeekId: dayId,
                                    ExerciseId: exerciseId,
                                    RoutineId: newRoutine.id
                                });
                            }
                        }
                    }
                }

                const detailArray = day.routineDetail;
                if (detailArray && detailArray.length > 0) {
                    allDetails.push(...detailArray);
                }
            }
        }

        // Asignar el array de detalles al campo routineDetail de la nueva rutina
        await newRoutine.update({
            routineDetail: allDetails
        });

        return newRoutine;
    } catch (error) {
        console.error('Error en createRoutine:', error);
        throw error;
    }
};



 const modifyUser = async (updatedData,dni) => {

    const user = await User.findByPk(dni);
   // console.log('desde el controller',user)
    // console.log('desde el controller',updatedData)

    const {values} = updatedData;
    console.log('desde el controller destructurando',values);
    
    if(user){
        const updatedUser = await user.update(values);
       // console.log(updatedUser)
        return updatedUser;
    }else{
        throw new Error('Usuario no encontrado');
    }

 };
 const modifyRoutine = async (routineId, updateData) => {
    // console.log('desde controller', routineId);
    // console.log('updatedata desde controller', updateData);

    try {
   
        const routineIdNumber = parseInt(routineId, 10);
        if (isNaN(routineIdNumber)) {
            throw new Error("Routine ID is not a valid number");
        }

       
        const routine = await Routine.findByPk(routineIdNumber);
        if (!routine) {
            throw new Error("Routine not found");
        }

        
        let routineDetails = routine.routineDetail || [];
        // console.log('routinedetail desde controller', routineDetails);

        
        const { exerciseId, setsAndReps } = updateData;
        const exerciseIdNumber = parseInt(exerciseId, 10); 
        
        const detailIndex = routineDetails.findIndex(detail => detail.id === exerciseIdNumber);
        if (detailIndex !== -1) {
            
            routineDetails[detailIndex].setsAndReps = setsAndReps;
        } else {
            
            // console.log(`Detail with id ${exerciseIdNumber} not found, skipping update.`);
        }

        // console.log('routineDetails actualizados:', routineDetails);

        
        await Routine.update(
            { routineDetail: routineDetails },
            { where: { id: routineIdNumber } } 
        );

        
        return await Routine.findByPk(routineIdNumber);
    } catch (error) {
        // console.error(`Failed to update routine: ${error.message}`);
        throw new Error(`Failed to update routine: ${error.message}`);
    }
};

const deleteExercise = async(routineId,exerciseId) => {

   try {
    // console.log('desde controller id rutina',routineId);
    // console.log('desde controller id ehercicio',exerciseId);

    const exercise = await ExerciseDayOfWeek.update({activo:false},{
        where:{
            RoutineId:routineId,
            ExerciseId:exerciseId
        }
    })
    console.log('actualizacion exitosa desde controlador',exercise);
    return exercise;
    
    
   } catch (error) {
        console.error('error',error)
        throw error
   }


};



const createNewExercise = async (routineId, dayId, exerciseId, routineDetail) => {
    try {
        // Verifica si la rutina existe
        const routine = await Routine.findByPk(routineId);
        if (!routine) {
            throw new Error(`La rutina con ID ${routineId} no existe.`);
        }

        const existingExercise = await ExerciseDayOfWeek.findOne({
            where: {
                DayOfWeekId: dayId,
                ExerciseId: exerciseId
            }
        });
        
        if (existingExercise) {
            await existingExercise.update({ activo: true });

            let newDetail = routine.routineDetail || [];
            newDetail.push(routineDetail);
            console.log("New Routine Detail:", newDetail);

            const updatedRoutine = await Routine.update(
                { routineDetail: newDetail },
                { where: { id: routineId }, returning: true }
            );
            
            // console.log("Updated Routine:", updatedRoutine);

            return existingExercise;
        } else {
            const response = await ExerciseDayOfWeek.create({
                DayOfWeekId: dayId,
                ExerciseId: exerciseId,
                RoutineId: routineId 
            });

            if (response) {
                let newDetail = routine.routineDetail || [];
                newDetail.push(routineDetail);

                const updatedRoutine = await Routine.update(
                    { routineDetail: newDetail },
                    { where: { id: routineId }, returning: true }
                );
                
                // console.log("Updated Routine:", updatedRoutine);
                
                return { response, routine: updatedRoutine };
            }
        }
    } catch (error) {
        console.error('Error al agregar ejercicio:', error);
    }
};



const getPaymentsWithFilters = async (filters) => {
    // Verificar que el objeto de filtros no esté vacío
    if (Object.keys(filters).length === 0) {
        // Si no hay filtros, devolver todos los pagos
        return await Payment.findAll();
    }

    // Aplicar filtros
    return await Payment.findAll({
        where: filters,
    });
};

const getAllPayments = async() => {

     try {
        const payments = await Payment.findAll({
          include: [
            {
              model: User,  // Incluye la tabla de usuarios
              attributes: ['dni', 'nombre'], // Trae los campos que necesites del usuario
            },
            {
              model: Activity,  // Incluye la tabla de actividades a través de PaymentActivities
              attributes: ['nombre','costo'], // Trae los campos que necesites de la actividad
              through: {
                attributes: [],  // Si no necesitas los campos de la tabla intermedia PaymentActivities
              },
            },
          ],
        });
    
        return payments;
      } catch (error) {
        console.error("Error fetching payments with user and activities:", error);
        throw error;
      }

};

const getAllExercises = async () => {

    const allExercises = await Exercise.findAll({
        attributes:['id','nombre','grupo_muscular']
    });

    if(allExercises){
        return allExercises;
    }else{
        throw new Error('Error al cargar los ejercicios')
    }
};

const postExercise = async (nombre,grupo_muscular,descripcion) => {

    const newExercise = await Exercise.create({nombre,grupo_muscular,descripcion})

    if(newExercise){
        return newExercise;
    }else{
        throw new Error('Error al crear el ejercicio');
    }

};

const createNewDay = async (routineId,day) => {
    // console.log(routineId);
    // console.log('desde controller dayToAdd',day);
    
    
    const routine = await Routine.findByPk(routineId);
    console.log('rutina desde controler addDay',routine);
    
    if(routine){
        const dayId = await DayOfWeek.findByPk(day);
        console.log(day);
        
        if(day){
           return await routine.addDayOfWeek(day);
        }
    }
};

const removeDay = async(routineId, day) => {

    // console.log(routineId);
    // console.log(day);

    const routine = await Routine.findByPk(routineId);
    const dayToRemove = await DayOfWeek.findByPk(day);

    if (!routine || !dayToRemove) {
        throw new Error('Routine or Day not found');
    }

    const removedDay = await routine.removeDayOfWeek(dayToRemove);

    if (removedDay) {
        await ExerciseDayOfWeek.update(
            { activo: false },
            {
                where: {
                    RoutineId: routineId,
                    DayOfWeekId: day
                }
            }
        );
        return removedDay;
    }

    throw new Error('Failed to remove day');
};

const createNewPost = async (titulo, subTitulo, cuerpo, uploadedImages) => {
    // console.log(titulo);
    // console.log(subTitulo);
    // console.log(cuerpo);
    // console.log(uploadedImages);
    
    try {
        // Crear el nuevo post en la base de datos
        const newPost = await Posts.create({
            titulo,
            subTitulo,
            cuerpo,
            multimedia: uploadedImages
        });

        return newPost;
    } catch (error) {
        console.error('Error al crear el nuevo post:', error);
        throw error;
    }
};

const getPosts = async() => {

    const response = await Posts.findAll();
    
    return response;

};

const postSection = async (name, settings) => {
    console.log('postSection - creando nueva sección con nombre:', name);
    
    const newSection = await Section.create({
        name: name,
        settings: [settings], // Guardar settings como un array
    });

    return newSection;
};

const updateExistingSection = async (name, newSettings) => {
    console.log('updateExistingSection - buscando sección con nombre:', name);
    
    // Buscar si existe una sección con el mismo nombre
    const section = await Section.findOne({ where: { name } });

    if (section) {
        // Si la sección ya existe, actualizar los settings
        console.log('La sección existe. Actualizando los settings...');

        const currentSettings = section.settings ? section.settings : [];
        const updatedSettings = [...currentSettings, newSettings]; // Añadir nuevos settings al array existente

        // Actualizar la sección con los nuevos settings
        section.settings = updatedSettings;
        await section.save();

        return section;
    }

    // Si no existe la sección, devolver null para que el handler cree una nueva
    return null;
};


const allSections = async() => {
    const sections = await Section.findAll();
    return sections
};

const createActivity = async(nombre,costo) => {
    console.log(nombre);
    console.log(costo);
    
    
    const activity = await Activity.create({nombre,costo});
    console.log(activity);
    
    return activity;

};

const allActivities = async() => {
    const activities = await Activity.findAll();
    return activities;
};

const addActivityToUser = async (dni, activityId) => {
    console.log(dni);
    console.log(activityId);
    
    
    try {

        const existingUserActivity = await UserActivities.findOne({
            where:{
                UserDni: dni,
                ActivityId: activityId
            }
        });
        if(existingUserActivity){
            existingUserActivity.update({activo:true});
        }else{

            const user = await User.findByPk(dni);

        if (user) {
            const activityToAdd = await Activity.findByPk(activityId);

            if (activityToAdd) {
                await user.addActivity(activityToAdd);
                
                return { message: 'Actividad agregada con éxito' };
            } else {
                throw new Error('Actividad no encontrada');
            }
        } else {
            throw new Error('Usuario no encontrado');
        }

        };

        
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const findUserActivities = async(dni) => {
    console.log('dni desde controller',dni);
    
    try {
        const userActivities = await UserActivities.findAll({
            where:{
                UserDni: dni,
                activo: true
            }
        });
        return userActivities;
    } catch (error) {
        console.error(error);
        throw error;
    }

};

const deleteActivity = async(dni,activityId) => {

    console.log(dni);
    console.log(activityId);

    try {
        const activity = await UserActivities.update({activo:false},{
            where:{
                UserDni: dni,
                ActivityId: activityId
            }
        });
        return{message: 'Actividad eliminada con éxito',activity}
    } catch (error) {
        console.error(error);
        throw error;
    }
    
    

};



module.exports = {postNewUser,getAllUsers,getUser,getUserByPk,newPayment,createRoutine,modifyUser,modifyRoutine,getAllPayments,getAllExercises,postExercise,deleteExercise,createNewExercise,createNewDay,removeDay,createNewPost,getPosts,postSection,allSections,createActivity,allActivities,addActivityToUser,findUserActivities,deleteActivity,getPaymentsWithFilters,updateExistingSection };

const { User, Payment, Routine, DayOfWeek, Exercise, sequelize, ExerciseDayOfWeek, RoutineDayOfWeek, Posts, Section, Activity, UserActivities, PaymentActivities, Tenants, UserTenantRoutine,Subscriptions } = require('../db');
const { Sequelize, Op, where } = require('sequelize');
const { hashPassword } = require('../functions/hasPassword');

//const UserTenantRoutine = require('../models/UserTenantRoutine');

const postNewUser = async (dni, nombre, fecha_nacimiento, telefono, mail, domicilio, rol, password, TenantId) => {
    console.log('tenantid desde controller', TenantId);
    console.log('dni desde controler postnewuser', dni);

    const existingUser = await User.findByPk(dni);

    if (existingUser) {
        // Verificar si el usuario ya está registrado para este tenant en la tabla intermedia
        const existingUserTenant = await UserTenantRoutine.findOne({
            where: {
                UserDni: dni,
                TenantId
            }
        });
        if (existingUserTenant) {
            return {
                status: 400,
                message: 'Usuario ya registrado para este Tenant'
            };
        } else {
            // Si el usuario existe pero no tiene relación, crearla
            await UserTenantRoutine.create({ TenantId, UserDni: dni, RoutineId: null });
            return {
                status: 200,
                message: 'Usuario relacionado al Tenant exitosamente'
            };
        }
    } else {
        // Si el usuario no existe, crearlo y luego registrar la relación
        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({
            dni,
            nombre,
            fecha_nacimiento,
            telefono,
            mail,
            domicilio,
            rol,
            password: hashedPassword
        });

        if (newUser) {
            // Crear la relación con el tenant
            await UserTenantRoutine.create({ TenantId, UserDni: dni, RoutineId: null });
        }

        return {
            status: 200,
            message: 'Usuario creado y registrado al Tenant exitosamente',
            newUser
        };
    }
};

const getAllUsers = async (tenantId) => {
    try {
        const tenant = await Tenants.findByPk(tenantId);

        // Si el tenant existe
        if (tenant) {
            const tenantDni = tenant.dni;

            // Filtramos los usuarios para no traer al mismo tenant
            const users = await UserTenantRoutine.findAll({
                where: {
                    TenantId: tenantId,
                },
            });

            // Función para obtener todos los detalles de los usuarios
            const usersArray = async (users) => {
                try {
                    // Ejecutamos todas las promesas de forma paralela
                    const allusers = await Promise.all(
                        users.map(async (user) => {
                            return await User.findByPk(user.UserDni);
                        })
                    );
                    return allusers;
                } catch (error) {
                    console.error('Error en usersArray:', error);
                    throw error; // Re-lanzamos el error para que lo capture el bloque de `catch` principal
                }
            };

            // Llamamos a usersArray para obtener los usuarios
            const allUsersDetails = await usersArray(users);

            // Logueamos los detalles de los usuarios
            console.log('Usuarios desde controller:', allUsersDetails);

            return allUsersDetails; // Devolvemos los detalles de los usuarios
        } else {
            throw new Error('Tenant no encontrado');
        }
    } catch (error) {
        console.error('Error en getAllUsers:', error);
        throw error; // Lanzamos el error para que lo maneje quien llame a esta función
    }
};



const getUser = async (name, tenantId) => {
    try {
        console.log('tenantId desde búsqueda por nombre:', tenantId);

        const user = await User.findAll({
            where: {
                nombre: {
                    [Op.iLike]: `%${name}%`,
                },
                TenantId: tenantId, // Asegúrate de que el nombre del campo sea correcto
            },
        });

        return user;
    } catch (error) {
        console.error('Error en la búsqueda de usuario:', error);
        throw error; // O maneja el error como prefieras
    }
};

const getUserByPk = async (dni, tenantId) => {
    console.log('DNI:', dni);
    console.log('Tenant ID desde controlador getUserByPk:', tenantId);

    try {
        const user = await User.findByPk(dni)
        // Buscar el usuario por DNI y TenantId
        const userTenant = await UserTenantRoutine.findOne({
            where: {
                UserDni: dni,
                TenantId: tenantId
            },
        });

        // Si no se encuentra el usuario, lanzar un error o retornar null
        if (!user) {
            console.log('Usuario no encontrado');
            return null; // O lanzar un error si lo prefieres
        }

        // Buscar la rutina asociada si existe el usuario
        const routine = await Routine.findByPk(userTenant.routineId, {
            attributes: ['id', 'routineDetail'],
            include: [
                {
                    model: DayOfWeek,
                    attributes: ['id'],
                    through: { attributes: [] }, // No incluir atributos del through
                    include: [
                        {
                            model: Exercise,
                            required: false,
                            where:{
                                TenantId: tenantId
                            },
                            attributes: ['nombre', 'id'],
                            through: {
                                model: ExerciseDayOfWeek,
                                where: { activo: true },
                                attributes: [] // No incluir atributos del through
                            }
                        }
                    ]
                },
            ]
        });

        console.log('dias recuperados desde controlador:',routine.DayOfWeeks);
        
        return { user, routine };

    } catch (error) {
        console.error('Error desde controlador:', error);
        throw error;
    }
};

const newPayment = async (dni, fecha_pago, monto, medio_pago, subscriptions, tenantId) => {
    try {
        // Buscar al usuario por su dni
        const user = await User.findByPk(dni);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Crear el registro de pago
        const payment = await Payment.create({
            fecha_pago,
            monto,
            medio_pago,
            TenantId: tenantId
        });

        if (!payment) {
            throw new Error('Error al crear el pago');
        }

        // Asociar el pago al usuario
        await user.addPayment(payment);

        // Función para calcular la fecha de vencimiento
        const calcularFechaVencimiento = (fechaPago, duracionMeses) => {
            const fecha = new Date(fechaPago); // Convertir la fecha de pago en un objeto Date
            fecha.setMonth(fecha.getMonth() + duracionMeses); // Sumar la duración en meses
            return fecha;
        };

        // Procesar cada suscripción dentro de subscriptions
        for (const [activityId, subscription] of Object.entries(subscriptions)) {
            // Crear la relación entre Payment y Activity en PaymentActivities
            const paymentActivity = await PaymentActivities.create({
                PaymentId: payment.id,
                ActivityId: activityId,
                fecha_vencimiento: calcularFechaVencimiento(fecha_pago, subscription.duration) // Fecha calculada según la duración
            });

            // Asegurarse de que la actividad del usuario esté asociada y actualizada en UserActivities
            const userActivity = await UserActivities.findOne({
                where: {
                    UserDni: dni,
                    ActivityId: activityId,
                },
            });

            if (userActivity) {
                // Si la relación ya existe, actualizar el estado de 'isPaid' a true
                await userActivity.update({ isPaid: true });
            } else {
                // Si no existe, crear la relación entre el usuario y la actividad
                await UserActivities.create({
                    UserDni: dni,
                    ActivityId: activityId,
                    isPaid: true,
                });
            }
        }

        return payment;

    } catch (error) {
        throw new Error(`Error al crear el pago: ${error.message}`);
    }
};




// const newPayment = async (dni, fecha_pago, monto, medio_pago, subscriptions, tenantId) => {
//     try {
//       // Buscar al usuario
//       const user = await User.findByPk(dni);
//       if (!user) {
//         throw new Error('Usuario no encontrado');
//       }
  
//       // Crear el pago
//       const payment = await Payment.create({ 
//         fecha_pago, 
//         monto, 
//         medio_pago, 
//         TenantId: tenantId 
//       });
  
//       if (!payment) {
//         throw new Error('Error al crear el pago');
//       }
  
//       // Asociar el pago al usuario
//       await user.addPayment(payment);
  
//       // Crear la relación entre el pago y las actividades
//       for (let id of activityIds) {
//         // Crear la asociación entre Payment y Activity en PaymentActivities
//         await PaymentActivities.create({ PaymentId: payment.id, ActivityId: id });
  
//         // Asegurarse de que UserActivities está correctamente asociada y actualizada
//         // Aquí estamos asumiendo que la relación entre el usuario y las actividades está definida
//         const userActivity = await UserActivities.findOne({
//           where: {
//             UserDni: dni,
//             ActivityId: id,
//           },
//         });
  
//         if (userActivity) {
//           // Si la relación ya existe, actualizamos el estado de 'isPaid' a 'true'
//           console.log(userActivity);
          
//          await userActivity.update({ isPaid: true });
//         } else {
//           // Si no existe, creamos la relación entre el usuario y la actividad
//           await UserActivities.create({
//             UserDni: dni,
//             ActivityId: id,
//             isPaid: true,
//           });
//         }
//       }
  
//       return payment;
  
//     } catch (error) {
//       throw new Error(`Error al crear el pago: ${error.message}`);
//     }
//   };
  

const createRoutine = async (routineObj, TenantId) => {
    try {
        const userId = routineObj.userId;
        const user = await UserTenantRoutine.findOne({
            where: {
                UserDni: userId,
                TenantId
            }
        });

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



const modifyUser = async (updatedData, dni) => {

    const user = await User.findByPk(dni);
    // console.log('desde el controller',user)
    // console.log('desde el controller',updatedData)

    const { values } = updatedData;
    console.log('desde el controller destructurando', values);

    if (user) {
        const updatedUser = await user.update(values);
        // console.log(updatedUser)
        return updatedUser;
    } else {
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

const deleteExercise = async (routineId, exerciseId) => {

    try {
        // console.log('desde controller id rutina',routineId);
        // console.log('desde controller id ehercicio',exerciseId);

        const exercise = await ExerciseDayOfWeek.update({ activo: false }, {
            where: {
                RoutineId: routineId,
                ExerciseId: exerciseId
            }
        })
        console.log('actualizacion exitosa desde controlador', exercise);
        return exercise;


    } catch (error) {
        console.error('error', error)
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

const getAllPayments = async (tenantId) => {
    console.log('tenantid desde getallpayments', tenantId);

    try {
        const payments = await Payment.findAll({
            where: {
                TenantId: tenantId,
            },
            include: [
                {
                    model: User,
                    attributes: ['dni', 'nombre'],

                },
                {
                    model: Activity,
                    attributes: ['nombre', 'costo'],
                    through: {
                        attributes: [],
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

const getAllExercises = async (TenantId) => {

    const allExercises = await Exercise.findAll({
        where: {
            TenantId
        },
        attributes: ['id', 'nombre', 'grupo_muscular']
    });

    if (allExercises) {
        return allExercises;
    } else {
        throw new Error('Error al cargar los ejercicios')
    }
};

const postExercise = async (nombre, grupo_muscular, descripcion, TenantId) => {
    console.log('tenantid desde controller', TenantId);

    const newExercise = await Exercise.create({ nombre, grupo_muscular, descripcion })

    if (newExercise) {
        await newExercise.setTenant(TenantId);
        return newExercise;
    } else {
        throw new Error('Error al crear el ejercicio');
    }

};

const createNewDay = async (routineId, day) => {
    // console.log(routineId);
    // console.log('desde controller dayToAdd',day);


    const routine = await Routine.findByPk(routineId);
    console.log('rutina desde controler addDay', routine);

    if (routine) {
        const dayId = await DayOfWeek.findByPk(day);
        console.log(day);

        if (day) {
            return await routine.addDayOfWeek(day);
        }
    }
};

const removeDay = async (routineId, day) => {

     console.log('desde delete day rouitineid',routineId);
     console.log(day);

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

const getPosts = async () => {

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


const allSections = async () => {
    const sections = await Section.findAll();
    return sections
};

const createActivity = async (nombre, costo, descripcion, TenantId) => {
    console.log(nombre);
    console.log(costo);
    console.log('tenantid desde createactivity controller', TenantId);

    const tenant = await Tenants.findByPk(TenantId);

    if (tenant) {

        const activity = await Activity.create({ nombre, costo, descripcion });
        if (activity) {
            await activity.setTenant(TenantId);
            console.log(activity);

            return activity;
        }
    }



};

const allActivities = async (TenantId) => {
    const activities = await Activity.findAll({
        where: {
            TenantId: TenantId
        }
    });
    return activities;
};

const addActivityToUser = async (dni, activityId) => {
    console.log(dni);
    console.log(activityId);


    try {

        const existingUserActivity = await UserActivities.findOne({
            where: {
                UserDni: dni,
                ActivityId: activityId
            }
        });
        if (existingUserActivity) {
            existingUserActivity.update({ activo: true });
        } else {

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

const findUserActivities = async (dni,TenantId) => {
    console.log('dni desde controller', dni);

    try {
        const userActivities = await UserActivities.findAll({
            where: {
                UserDni: dni,
                activo: true,
                
            },
           
        });
        
       return userActivities;
       
    } catch (error) {
        console.error(error);
        throw error;
    }

};

const deleteActivity = async (dni, activityId) => {

    console.log(dni);
    console.log(activityId);

    try {
        const activity = await UserActivities.update({ activo: false }, {
            where: {
                UserDni: dni,
                ActivityId: activityId
            }
        });
        return { message: 'Actividad eliminada con éxito', activity }
    } catch (error) {
        console.error(error);
        throw error;
    }



};

const createSubscription = async (duration, discount, tenantId) => {
    console.log('duration: desde codntroller ccreate', duration);   
    console.log('discount: desde codntroller ccreate', discount);
    console.log('tenantId: desde codntroller ccreate', tenantId);
    

    try {
        const existingSubscription = await Subscriptions.findOne({
            where: {
                duration,
                TenantId: tenantId
            }
        });

        if (existingSubscription) {
            throw new Error('Ya existe una suscripción con esa duración');
        }
        const newSubscription = await Subscriptions.create({
            duration,
            discount,
            TenantId: tenantId
        });

        return newSubscription;
    } catch (error) {
        console.error('Error al crear la suscripción:', error);
        throw error;
    }
};

const allSubscriptions = async (tenantId) => {
    // console.log('tenantId desde controller', tenantId);

    try {
        const subscriptions = await Subscriptions.findAll({
            where: {
                TenantId: tenantId
            }
        });

        return subscriptions;
    } catch (error) {
        console.error('Error al buscar las suscripciones:', error);
        throw error;
    }
};

const modifySubscription = async (subscriptionId, updateData) => {
     console.log('subscriptionId:', subscriptionId);
     console.log('updateData:', updateData);

    try {
        const subscription = await Subscriptions.findByPk(subscriptionId);

        if (!subscription) {
            throw new Error('Suscripción no encontrada');
        }

        const updatedSubscription = await subscription.update(updateData);

        return updatedSubscription;
    } catch (error) {
        console.error('Error al modificar la suscripción:', error);
        throw error;
    }
}



module.exports = { postNewUser, getAllUsers, getUser, getUserByPk, newPayment, createRoutine, modifyUser, modifyRoutine, getAllPayments, getAllExercises, postExercise, deleteExercise, createNewExercise, createNewDay, removeDay, createNewPost, getPosts, postSection, allSections, createActivity, allActivities, addActivityToUser, findUserActivities, deleteActivity, getPaymentsWithFilters, updateExistingSection, createSubscription, allSubscriptions,modifySubscription };

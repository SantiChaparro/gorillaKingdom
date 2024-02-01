const { User,Payment,Routine,DayOfWeek,Exercise } = require('../db');
const {Op} = require('sequelize');


const postNewUser = async (dni,nombre,fecha_nacimiento,telefono,mail,domicilio) => {

    const newUser = await User.create({dni,nombre,fecha_nacimiento,telefono,mail,domicilio});

    return newUser;
};

const getAllUsers = async () => {

    const users = await User.findAll();

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
    const user = await User.findByPk(dni, {
        include: [
            {
                model: Payment,
                attributes: ['fecha_pago', 'monto']
            },
            {
                model: Routine,
                attributes: ['id'],
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
                                attributes: ['nombre'],
                                through: {
                                    attributes: []
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    });
    //console.log(user)
    return user;
};

const newPayment = async (dni, fecha_pago , monto) => {

    const user = await User.findOne({where:{dni}});

    
    if(user){

        const payment = await Payment.create({fecha_pago , monto})

        await user.addPayment(payment);
        
        return payment;

    }
    else{
        console.error("No existe el usuario")
    }

    

};

const createRoutine = async (routineObj) => {
    const userId = routineObj.userId;
   // console.log(userId)
    const user = await User.findByPk(userId);
   // console.log(user)
 
    if (user) {
       const newRoutine = await Routine.create();
    //   console.log(newRoutine)
 
       await user.setRoutine(newRoutine);
 
       for (const day of routineObj.days) {
          const dayId = day.dayId;
          const foundDay = await DayOfWeek.findByPk(dayId);
        //  console.log(foundDay)
 
          if (foundDay) {
             //console.log('desde el if:',foundDay)
            await newRoutine.addDayOfWeek(foundDay)
 
             const exerciseArray = day.exercisesId;
 
             if (exerciseArray && exerciseArray.length > 0) {
                for (const exerciseId of exerciseArray) {
                   const foundExercise = await Exercise.findByPk(exerciseId);
 
                   if (foundExercise) {
                      await foundDay.addExercise(foundExercise);
                   }
                }
             }
          }
       }
       return newRoutine;
    }
    else{
       throw new Error('Usuario no encontrado'); // Manejo de error si el usuario no se encuentra
    }
 };

 const modifyUser = async (updatedData,dni) => {

    const user = await User.findByPk(dni);
    console.log('desde el controller',user)
    
    if(user){
        const updatedUser = await user.update(updatedData);
       // console.log(updatedUser)
        return updatedUser;
    }else{
        throw new Error('Usuario no encontrado');
    }

 };

 
 const modifyRoutine = async (updateData) => {
    const userId = updateData.userId;
    const user = await User.findByPk(userId, {
        include: {
            model: Routine,
            include: DayOfWeek // Incluye los días de la semana y los ejercicios asociados
        }
    });

    if (user && user.Routine) {
        const routineToUpdate = user.Routine;

        // Eliminar todos los días de la semana existentes de la rutina
        await routineToUpdate.removeDayOfWeeks();

        // Recorre los días de la semana proporcionados en el objeto de rutina
        for (const day of updateData.days) {
            const dayId = day.dayId;
            const foundDay = await DayOfWeek.findByPk(dayId);

            if (foundDay) {
                // Asocia el día de la semana a la rutina
                await routineToUpdate.addDayOfWeek(foundDay);

                const exerciseArray = day.exercisesId;

                if (exerciseArray && exerciseArray.length > 0) {
                    // Asocia los ejercicios al día de la semana
                    await foundDay.setExercises(exerciseArray);
                }
            }
        }

        // Devuelve la rutina actualizada
        return routineToUpdate;
    } else {
        throw new Error('Usuario no encontrado o sin rutina asociada');
    }
};

const getAllPayments = async (month) => {

    const selectedMonth = Number(month);
    const primerDiaMes = new Date(new Date().getFullYear(), selectedMonth - 1, 1); // Restamos 1 al mes para que sea 0-indexed (enero es 0)
    const ultimoDiaMes = new Date(new Date().getFullYear(), selectedMonth, 0);

    



    const paymentsByMonth = await Payment.findAll({
        where:{
            fecha_pago:{
                [Op.between]:[primerDiaMes,ultimoDiaMes]
                
            }
        }
    });

    if(paymentsByMonth){
        return paymentsByMonth
    }else{
        throw new Error('No hay pagos registrados ')
    }

    

};


module.exports = {postNewUser,getAllUsers,getUser,getUserByPk,newPayment,createRoutine,modifyUser,modifyRoutine,getAllPayments};

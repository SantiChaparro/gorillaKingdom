const { User , Routine , Exercise , DayOfWeek } = require('../db');
const { Op } = require('sequelize');

const getRoutineByUserId = async (id)=>{
    
    const user = await User.findByPk(id,
        {
            
            include:[
                {
                   model: Routine,
                   attributes: ['id'],
                   include: [
                       {
                        model: Exercise,
                        attributes: ['id','nombre']
                       },
                       {
                        model: DayOfWeek,
                        attributes: ['id']
                       }
                   ]
                   
                }
            ]
        }
    );

    if(user){
        console.log(user.Routine);
        return user.Routine;
    }
    else{
        console.log('Usuario no encontrado');
    }
}

module.exports = {getRoutineByUserId};
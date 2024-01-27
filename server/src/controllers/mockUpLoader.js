const exerciseMock = require('../mockups/exercisesMockUp.json');

const { Exercise } = require('../db');


const excersiceLoader = async() => {
    const excercise = exerciseMock.exercises.map((item)=>{
        return{
            nombre: item.nombre,
            grupo_muscular: item.grupo_muscular
        }
    
    });

    
    const loadexercises = await Exercise.bulkCreate(excercise)
   
    return loadexercises;
};



module.exports = excersiceLoader
    


const server = require('./src/server');
const { conn } = require('./src/db');
require('dotenv').config();
const excersiceLoader   = require('./src/controllers/mockUpLoader');
const daysLoader = require('./src/controllers/dayLoader');
const usersLoader = require('./src/controllers/usersLoader');
const activityLoader = require('./src/controllers/activitiesLoader');
const paymentLoader = require('./src/controllers/paymentsLoader');
//const PORT = 3001;
const PORT = process.env.PORT

conn.sync({force: false}).then(async ()=>{

    server.listen(PORT,()=>{
        console.log(`Listening to port ${PORT}`);
    });

    try {
        
       
       // excersiceLoader();
      //  daysLoader();
        //usersLoader();
       // activityLoader();
       // paymentLoader();
        console.log('Ejercicios cargados exitosamente en base de datos');
        console.log('Días cargados con éxito');

    } catch (error) {
        console.error(error);
    }

}).catch(error => console.error(error))




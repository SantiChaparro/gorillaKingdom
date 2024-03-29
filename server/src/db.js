require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/gorillakingdom`, {
  logging: false, 
  native: false, 
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Routine,Exercise,User,Payment,DayOfWeek } = sequelize.models;

//const RoutineExercise = sequelize.models.RoutineExercise || sequelize.define('RoutineExercise', {});

// Aca vendrian las relaciones

User.belongsTo(Routine);
Routine.hasMany(User);

Routine.belongsToMany(DayOfWeek, { through: 'RoutineDayOfWeek' });
DayOfWeek.belongsToMany(Routine, { through: 'RoutineDayOfWeek' });

DayOfWeek.belongsToMany(Exercise, {through: 'ExerciseDayOfWeek'});
Exercise.belongsToMany(DayOfWeek, {through: 'ExerciseDayOfWeek'});

Payment.belongsTo(User); 
User.hasMany(Payment);




/*
Routine.belongsToMany(Exercise, { through: 'RoutineExercise' });
Exercise.belongsToMany(Routine, { through: 'RoutineExercise' });
DayOfWeek.hasMany(Exercise);
Exercise.belongsTo(DayOfWeek);
sequelize.models.RoutineExercise.belongsTo(DayOfWeek);
DayOfWeek.hasMany(sequelize.models.RoutineExercise);
*/




// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
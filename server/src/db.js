require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');
//const TemporaryPayments = require("./models/TemporaryPayments");
const {
  DB_USER, DB_PASSWORD, DB_HOST,DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
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

const { Routine,Exercise,User,Payment,DayOfWeek,ExerciseDayOfWeek,Posts,Section,Activity ,UserActivities,PaymentActivities,TenantsPayments,Tenants,Plans,TemporaryTenants,TemporaryPayments,UserTenantRoutine,Subscriptions} = sequelize.models;

//const RoutineExercise = sequelize.models.RoutineExercise || sequelize.define('RoutineExercise', {});

// Aca vendrian las relaciones

// User.belongsTo(Tenants);
// Tenants.hasMany(User);
Tenants.belongsToMany(User, { through: 'UserTenantRoutine'});
User.belongsToMany(Tenants, { through: 'UserTenantRoutine'});



UserTenantRoutine.belongsTo(Routine, {
  foreignKey: 'routineId'
});
Routine.hasOne(UserTenantRoutine, {
  foreignKey: 'routineId'
});

// Routine.belongsToMany(User, { through: 'UserTenantRoutine',foreignKey:'dni' });
// User.belongsToMany(Routine, { through: 'UserTenantRoutine',foreignKey:'dni' });

// Tenants.belongsToMany(Routine, { through: 'UserTenantRoutine',foreignKey: 'TenantId'  });
// Routine.belongsToMany(Tenants, { through: 'UserTenantRoutine',foreignKey: 'RoutineId'  });



// User.belongsTo(Routine);
// Routine.hasMany(User);

Tenants.belongsTo(Plans);
Plans.hasMany(Tenants);

TemporaryPayments.belongsTo(TemporaryTenants);
TemporaryTenants.hasOne(TemporaryPayments);

TenantsPayments.belongsTo(Tenants);
Tenants.hasMany(TenantsPayments);

Routine.belongsToMany(DayOfWeek, { through: 'RoutineDayOfWeek' });
DayOfWeek.belongsToMany(Routine, { through: 'RoutineDayOfWeek' });

DayOfWeek.belongsToMany(Exercise, {through: 'ExerciseDayOfWeek'});
Exercise.belongsToMany(DayOfWeek, {through: 'ExerciseDayOfWeek'});

User.belongsToMany(Activity, { through: 'UserActivities' });
Activity.belongsToMany(User, { through: 'UserActivities' });

Payment.belongsToMany(Activity,{ through: 'PaymentActivities'});
Activity.belongsToMany(Payment,{ through: 'PaymentActivities'});

Activity.belongsToMany(Subscriptions,{ through: 'ActivitySubscriptions'});
Subscriptions.belongsToMany(Activity,{ through: 'ActivitySubscriptions'});


// UserActivities.belongsTo(Activity, { foreignKey: 'activityId', as: 'activity' });

// // En el modelo Activity
// Activity.hasMany(UserActivities, { foreignKey: 'activityId', as: 'userActivities' });

// UserActivities.belongsTo(User, { foreignKey: 'UserDni' });
// User.hasMany(UserActivities, { foreignKey: 'UserDni' });

UserActivities.hasMany(PaymentActivities, {
  foreignKey: 'ActivityId',
  sourceKey: 'ActivityId',
  as: 'paymentActivities'
});

PaymentActivities.belongsTo(UserActivities, {
  foreignKey: 'ActivityId',
  targetKey: 'ActivityId',
  as: 'userActivities'
});

PaymentActivities.belongsTo(Payment, {
  foreignKey: 'PaymentId',
  targetKey: 'id', // El campo 'id' en la tabla Payment
  as: 'payment'
});

// Payment has many PaymentActivities
Payment.hasMany(PaymentActivities, {
  foreignKey: 'PaymentId',
  sourceKey: 'id',
  as: 'paymentActivities'
});

UserActivities.belongsTo(Activity, {
  foreignKey: 'ActivityId',
  targetKey: 'id',
  as: 'activity'
});

Activity.hasMany(UserActivities, {
  foreignKey: 'ActivityId',
  sourceKey: 'id',
  as: 'userActivities'
});

ExerciseDayOfWeek.belongsTo(Routine);
Routine.hasMany(ExerciseDayOfWeek);

Payment.belongsTo(Tenants);
Tenants.hasMany(Payment);

Subscriptions.belongsTo(Tenants);
Tenants.hasMany(Subscriptions);


Activity.belongsTo(Tenants);
Tenants.hasMany(Activity);

Exercise.belongsTo(Tenants);
Tenants.hasMany(Exercise);

Payment.belongsTo(User); 
User.hasMany(Payment);

Posts.belongsTo(User); 
User.hasMany(Posts);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
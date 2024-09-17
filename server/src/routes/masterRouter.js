const {Router} = require("express");
const upload = require('../config/multerConfig');


const { postUser,
        getUsers,
        postPayment, 
        postRoutine,
        updateUser,
        updateRoutine,
        getPayments,
        getExercises,
        createExercise,
        removeExercise,
        addExercise,
        addDay,
        deleteDay,
        newPost,
        getAllPosts,
        addSection,
        getAllSections,
        postActivity,
        getActivities,
        addActivity,
        getUserActivities,
        removeUserActivity,
        
        
       
    } = require('../handlers/masterHandlers');
    
    const {getRoutineById} = require('../handlers/usersHandlers')
    

const masterRouter = Router();

masterRouter.get('/routine',getRoutineById)
masterRouter.get('/findExercises',getExercises);
masterRouter.get('/findUsers',getUsers)
masterRouter.get('/findUsers/:dni', getUsers);
masterRouter.get('/search',getUsers);
masterRouter.post('/postPayment',postPayment)
masterRouter.post('/routine',postRoutine);
masterRouter.patch('/updateUser/:dni',updateUser);
masterRouter.patch('/updateRoutine/:dni',updateRoutine);
masterRouter.patch('/routine/:routineId/deleteExercise/:exerciseId',removeExercise)
masterRouter.patch('/addExercise/:routineId',addExercise);
masterRouter.post('/addNewday/:routineId',addDay)
masterRouter.get('/payment/:month?/:dni?',getPayments);
masterRouter.post('/createExercise',createExercise);
masterRouter.get('/usersDetail/:dni', getUsers);
masterRouter.post('/',postUser);
masterRouter.delete('/removeDay/:routineId',deleteDay);
masterRouter.post('/newPost',  upload.array('multimedia', 10), newPost);
masterRouter.get('/allPosts',getAllPosts);
masterRouter.get('/allSections',getAllSections)
masterRouter.post('/newSection', upload.array('multimedia', 10), addSection);
masterRouter.post('/newActivity',postActivity);
masterRouter.get('/allActivities',getActivities);
masterRouter.post('/addSctivityByUserId/:dni',addActivity);
masterRouter.get('/currentUserActivities/:dni',getUserActivities);
masterRouter.patch('/removeUserActivity/:dni',removeUserActivity)




module.exports = masterRouter;
const { User } = require('../db');
const {
    postNewUser,
    getAllUsers,
    getUser,
    getUserByPk,
    newPayment,
    createRoutine,
    modifyUser,
    modifyRoutine,
    getAllPayments,
    getAllExercises,
    postExercise,
    deleteExercise,
    createNewExercise,
    createNewDay,
    removeDay,
    createNewPost,
    getPosts,
    postSection,
    allSections,
    createActivity,
    allActivities,
    addActivityToUser,
    findUserActivities,
    deleteActivity,
    getPaymentsWithFilters,
    updateExistingSection,
    createSubscription,
    allSubscriptions,
    modifySubscription 
} = require('../controllers/masterControllers');

const Routine = require('../models/Routine');
const { uploadImage } = require('../services/cloudinaryService');
const fs = require('fs');
const path = require('path');
const { json } = require('sequelize');


const postUser = async (req,res)=>{
    console.log(req.body);
    const {dni,nombre,fecha_nacimiento,telefono,mail,domicilio,rol,password,TenantId} = req.body;
    console.log('desde handler tenantid',TenantId);

    try {

        const newUser = await postNewUser(dni,nombre,fecha_nacimiento,telefono,mail,domicilio,rol,password,TenantId);

        res.status(200).json({ message: 'Usuario creado', newUser});

    } catch (error) {
        res.status(500).json({error:error.message});
    }
    
    // const existingUser = await User.findByPk(dni);
    
    // if(existingUser){
    //     res.send('Usuario ya registrado');
    // }
    // else{

       

    // }

};


const getUsers = async (req, res) => {
    const { name } = req.query;
    const {tenantId} = req.query;
    const { dni  } = req.params;
    console.log('req.user desde getusers',req.query);
    
   // const tenantId = req.user.TenantId;
   console.log('tenantId desde params get users', tenantId);
   

   // console.log('tenantId desde token get users', tenantId);
    

    console.log(dni);

    try {
        let user;

        if (name) {
            user = await getUser(name,tenantId);
        } else if (dni) {
            user = await getUserByPk(dni,tenantId);
        } else {
            user = await getAllUsers(tenantId);
        }

        if (user !== null && (Array.isArray(user) ? user.length > 0 : true)) {
            console.log('usuario', user);
            res.status(200).json(user);
        } else {
            res.status(404).send({message:'Usuario no encontrado'});
        }
    } catch (error) {
        console.log('error desde el handler', error);
        res.status(500).send({ error: error.message });
    }
};

const postPayment = async (req,res) => {
    const paymentData = req.body;
    const {TenantId} = req.query;
    console.log(paymentData);
    console.log('tenantdid desde postpayment',TenantId);
    
    const { dni , fecha_pago , monto, medio_pago ,subscriptions } = paymentData;
    console.log(dni,fecha_pago,monto,medio_pago,subscriptions);
    
    

    try {
        
        const payment = await newPayment(dni, fecha_pago , monto, medio_pago,subscriptions,TenantId); 

        res.status(200).json(payment);

    } catch (error) {
        res.status(500).send({error:error.message})
    }

};

const postRoutine = async (req,res) => {

    const {routineObj} = req.body;
    const {TenantId} = req.query;
    console.log('desde handler',req.body)
    console.log('desde el handler',routineObj);
    console.log('tenantId desde handler postroutine',TenantId);
    

    try {
        
        const newRoutine = await createRoutine(routineObj,TenantId);

        if(newRoutine){
            const successMessage = "Rutina creada con éxito"
            res.status(200).json({successMessage,newRoutine})
        }

        console.log(newRoutine);
        

    } catch (error) {
        
        res.status(500).json({error:error.message});

    }

};

const updateUser = async (req,res) => {

    const {dni} = req.params;
    const updatedData = req.body;
    

    try {
  
            const updatedUser = await modifyUser(updatedData,dni);
            res.status(200).json(updatedUser);
        
    } catch (error) {
            res.status(500).send(error.message);
    }
};

const updateRoutine = async(req,res) => {

    const {dni} = req.params;
    const {updateData} = req.body;
   console.log('handler',dni);
   console.log('handler',updateData);

    try {
        
        const updatedRoutine = await modifyRoutine(dni,updateData);
        res.status(200).json(updatedRoutine);

    } catch (error) {
        res.status(500).send(error.message);
    }


};

const removeExercise = async (req,res) => {

    const {routineId,exerciseId} = req.params;
    
      try {
        const removedExercise = await deleteExercise(routineId,exerciseId);
       console.log('ejercicio eliminado',removedExercise)
        if(removedExercise){
            res.status(200).json(removedExercise)
        }
    } catch (error) {
        res.status(500).send(error.message);
        throw error
    }


};

const getPayments = async (req, res) => {
    const { month, dni, tenantId } = req.query; // Cambiado a req.query para obtener parámetros de consulta
    console.log('Received params:', { month, dni , tenantId});
    console.log('tenantId desde getpayments handler',tenantId);
    console.log('req desde getpayments handler',req);
    

    try {
        // Construir objeto de filtros dinámicos
        const filters = {};
        if (month) filters.month = month;
        if (dni) filters.dni = dni;

        let allPayments;

        allPayments = await getAllPayments(tenantId);

        // Si no hay filtros, obtener todos los pagos
        // if (Object.keys(filters).length === 0) {
        //     allPayments = await getAllPayments(tenantId); // Llama a getAllPayments si no hay filtros
        // } else {
        //     allPayments = await getPaymentsWithFilters(filters); // Obtén pagos con filtros si los hay
        // }

        res.status(200).json(allPayments);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getExercises = async (req,res) => {
    const {TenantId} = req.query;
    console.log('tenantId desde getexercises handler',TenantId);
    

    try {

        const foundExercises = await getAllExercises(TenantId);
        res.status(200).json(foundExercises);

    } catch (error) {
        res.status(500).send(error.message);
    }



};

const createExercise = async (req,res) => {
    const {TenantId} = req.query;
    console.log('tenantId desde createexercise handler',TenantId);
    
    const {nombre,grupo_muscular,descripcion} = req.body;

    try {
        
        const newExercise = await postExercise(nombre,grupo_muscular,descripcion,TenantId);

        res.status(200).json(newExercise);

    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addExercise = async(req,res) => {

    const addExercise = req.body;
    const {routineId} = req.params;
    console.log('desde handler',addExercise);
    console.log('desde handler',routineId);
    const {dayId,exerciseId,routineDetail} = addExercise;
    console.log(dayId);
    console.log(exerciseId);
    console.log(routineDetail);
    

    try {
        const addedExercise = await createNewExercise(routineId,dayId,exerciseId,routineDetail);
        if(addedExercise){
            console.log('desde handler addedexrcise',addedExercise);
            
            res.status(200).json(addedExercise);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }


    
     
};

const deleteDay = async (req, res) => {
    const { routineId } = req.params;
    const { day } = req.body; 
    
    console.log('Body desde handler:', req.body);
    
    try {
      
        const deletedDay = await removeDay(routineId, day);
        
        
        if (deletedDay) {
            res.status(200).json({ successMessage: 'Día eliminado correctamente', deletedDay });
        } else {
            res.status(404).json({ errorMessage: 'No se encontró el día para eliminar' });
        }
    } catch (error) {
        res.status(500).send({ errorMessage: error.message });
    }
};

const addDay = async(req,res) => {
    const{routineId} = req.params;
    const{day} = req.body;
    console.log('desde handler body',req.body);
    console.log(('desde addday',routineId));
    console.log(day);
    
    
    try {
        const addedDay = await createNewDay(routineId,day);
        console.log((addedDay));
        
        if(addedDay){
            const successMesage = 'Día agregado con éxito';
            res.status(200).json({addedDay,successMesage});
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// El req.body en tu handler newPost ahora contendrá los campos de texto del formulario, 
// mientras que los archivos estarán en req.files (para múltiples archivos) 
// o req.file (para un solo archivo).

const newPost = async (req, res) => {
    const { titulo, subTitulo, cuerpo } = req.body;
    const multimedia = req.files; // Obtiene los archivos subidos
 

    try {
        // Verifica que se han subido archivos
        if (!multimedia || multimedia.length === 0) {
            return res.status(400).send({ error: 'No files were uploaded.' });
        }

        // Subir las imágenes a Cloudinary utilizando el servicio
        const uploadedImages = await Promise.all(
            multimedia.map(async (file) => {
                // Construye la ruta absoluta al archivo
                const filePath = file.path
                
                // Verifica que el archivo exista
                if (!fs.existsSync(filePath)) {
                    throw new Error(`File not found: ${filePath}`);
                }
                
                // Usa el servicio de subida, asumiendo que `uploadImage` acepta la ruta del archivo
                const publicId = file.originalname.split('.')[0]; // Genera un id único basado en el nombre del archivo
                const uploadResult = await uploadImage(filePath, publicId); 
                
                return uploadResult.secure_url; // Devuelve la URL de la imagen subida
            })
        );

        // Crear un nuevo post con las URLs de las imágenes
        const newPost = await createNewPost(titulo, subTitulo, cuerpo, uploadedImages);

        if (newPost) {
            res.status(200).json(newPost);
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getAllPosts = async(req,res) => {
    try {
        const allPosts = await getPosts();
        res.status(200).json(allPosts)
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
const addSection = async (req, res) => {
    const { name, titulo, subTitulo, orden, cuerpo, sectionStyle } = req.body;
    const multimedia = req.files; // Obtiene los archivos subidos

    console.log('addSection', name);
    console.log('addSection', titulo);
    console.log('addSection', subTitulo);
    console.log('addSection', orden);
    console.log('addSection', cuerpo);
    console.log('addSection', sectionStyle);

    try {
        // Subir las imágenes a Cloudinary utilizando el servicio
        const uploadedImages = [];
        if (multimedia && multimedia.length > 0) {
            for (const file of multimedia) {
                const filePath = file.path;

                // Verifica que el archivo exista
                if (!fs.existsSync(filePath)) {
                    throw new Error(`File not found: ${filePath}`);
                }

                // Usa el servicio de subida
                const publicId = file.originalname.split('.')[0]; // Genera un id único basado en el nombre del archivo
                const uploadResult = await uploadImage(filePath, publicId);

                // Almacena la URL de la imagen subida
                uploadedImages.push(uploadResult.secure_url);
            }
        }

        const newSettings = {
            titulo,
            subTitulo,
            orden,
            cuerpo,
            sectionStyle,
            imagenes: uploadedImages,
        };

        console.log('newSettings', newSettings);

        // Llama al controlador para verificar si existe la sección
        const existingSection = await updateExistingSection(name, newSettings);

        if (existingSection) {
            // Si la sección existe, se ha actualizado
            return res.status(200).json(existingSection);
        } else {
            // Si no existe, crea una nueva sección
            const newSection = await postSection(name, newSettings);
            return res.status(200).json(newSection);
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getAllSections = async(req,res) => {

    try {
        const sections = await allSections()
        res.status(200).json(sections);
    } catch (error) {
        res.status(500).send({error:error.message})
    }

};

const postActivity = async(req,res) => {
    const {nombre , costo, descripcion} = req.body;
    const {Tenantid} = req.query;	
    console.log(nombre);
    console.log(costo);
    console.log(descripcion);
    console.log('tenantid desde postactivity handler',Tenantid);
    
    
    
    

    try {
        const newActivity = await createActivity(nombre,costo,descripcion,Tenantid);
        res.status(200).json(newActivity);
    } catch (error) {
        res.status(500).send({error:error.message})
    }
};

const getActivities = async(req,res) => {
    const { TenantId } = req.query;
    console.log('req.query desde getactivities handler',req.query);
    
    console.log('tenantId desde getactivities handler',TenantId);
    

    try {
        const activities = await allActivities(TenantId);
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).send({error:error.message})
    }

};

const addActivity = async(req,res) => {
    const dni = req.params.dni || req.body.dni;
    console.log(dni);
    
    const {activityId} = req.body;

    try {
        const addedActivity = await addActivityToUser(dni,activityId);
        res.status(200).json(addedActivity);
    } catch (error) {
        res.status(500).send({error:error.message})
    }

};

const getUserActivities = async(req,res) => {
    const {dni} = req.params;
    const {Tenantid} = req.query;
    console.log('tenantId desde getuseractivities handler',Tenantid);

    try {
        const userActivities = await findUserActivities(dni,Tenantid);
        res.status(200).json(userActivities);
    } catch (error) {
        res.status(500).send({error:error.message});
    }
};

const removeUserActivity = async(req,res) => {

    const {dni} = req.params;
    const {ActivityId} = req.body;
    
    try {
        const removedActivity = await deleteActivity(dni,ActivityId);
        res.status(200).json(removedActivity);
    } catch (error) {
        res.status(500).send({error:error.message});
    }

};

const postSubscription = async(req,res) => {
    const {tenantId} = req.query;
    const {duration,discount} = req.body;
    console.log('body desde postsubscription handler',req.body);
    
    console.log('tenantId desde postsubscription handler',tenantId);
    console.log('duration desde postsubscription handler',duration);
    console.log('discount desde postsubscription handler',discount);
    

    try {
        const newSubscription = await createSubscription(duration,discount,tenantId);
        res.status(200).json(newSubscription);
    } catch (error) {
        res.status(500).send({error:error.message});
    }
};

const getSubscriptions = async(req,res) => {
    const {tenantId} = req.query;
    console.log('tenantId desde getsubscriptions handler',tenantId);

    try {
        const subscriptions = await allSubscriptions(tenantId);
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).send({error:error.message});
    }
};

const upDateSubscription = async(req,res) => {
    const {id} = req.params;
    const updateData = req.body;
    console.log('body desde handler updatesubscription',req.body);
    
    console.log('id desde handler',id);
    console.log('updateData desde handler updatesubscription',updateData);
    

    try {
        const updatedSubscription = await modifySubscription(id,updateData);
        res.status(200).json(updatedSubscription);
    } catch (error) {
        res.status(500).send({error:error.message});
    }
};



module.exports = {postUser,getUsers,postPayment,postRoutine,updateUser,updateRoutine,getPayments,getExercises,createExercise,removeExercise,addExercise,addDay,deleteDay,newPost,getAllPosts,addSection,getAllSections,postActivity,getActivities,addActivity,getUserActivities,removeUserActivity,postSubscription,getSubscriptions,upDateSubscription};
const { User } = require('../db');
const {postNewUser,getAllUsers,getUser,getUserByPk,newPayment,createRoutine,modifyUser,modifyRoutine,getAllPayments,getAllExercises,postExercise} = require('../controllers/masterControllers');
const Routine = require('../models/Routine');


const postUser = async (req,res)=>{
    console.log(req.body);
    const {dni,nombre,fecha_nacimiento,telefono,mail,domicilio,rol,password} = req.body;
    const existingUser = await User.findByPk(dni);
    
    if(existingUser){
        res.send('Usuario ya registrado');
    }
    else{

        try {

            const newUser = await postNewUser(dni,nombre,fecha_nacimiento,telefono,mail,domicilio,rol,password);

            res.status(200).json({ message: 'Usuario creado', newUser});
    
        } catch (error) {
            res.status(500).json({error:error.message});
        }

    }

};


const getUsers = async (req, res) => {
    const { name } = req.query;
    const { dni } = req.params;
    

    try {
        let user;

        if (name) {
            user = await getUser(name);
        } else if (dni) {
            user = await getUserByPk(dni);
        } else {
            user = await getAllUsers();
        }

        if (user !== null && (Array.isArray(user) ? user.length > 0 : true)) {
            res.status(200).json(user);
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const postPayment = async (req,res) => {

    const { dni , fecha_pago , monto } = req.body;
    

    try {
        
        const payment = await newPayment(dni, fecha_pago , monto)

        res.status(200).json(payment);

    } catch (error) {
        res.status(500).send(error.message)
    }

};

const postRoutine = async (req,res) => {

    const {routineObj} = req.body;
    console.log(req.body)

    try {
        
        const newRoutine = await createRoutine(routineObj);

        res.status(200).json(newRoutine);

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

    //const {dni} = req.params;
    const {updateData} = req.body;
   // console.log(updateData.days)

    try {
        
        const updatedRoutine = await modifyRoutine(updateData);
        res.status(200).json(updatedRoutine);

    } catch (error) {
        res.status(500).send(error.message);
    }


};

const getPayments = async (req,res) => {

    const {month} = req.params; 
    console.log(month)

    try {
        const allPayments = await getAllPayments(month)
        res.status(200).json(allPayments)
    } catch (error) {
        res.status(500).send(error.message);
    }

};

const getExercises = async (req,res) => {

    try {

        const foundExercises = await getAllExercises();
        res.status(200).json(foundExercises);

    } catch (error) {
        res.status(500).send(error.message);
    }



};

const createExercise = async (req,res) => {
    const {nombre,grupo_muscular} = req.body;

    try {
        
        const newExercise = await postExercise(nombre,grupo_muscular);

        res.status(200).json(newExercise);

    } catch (error) {
        res.status(500).send(error.message);
    }
};


module.exports = {postUser,getUsers,postPayment,postRoutine,updateUser,updateRoutine,getPayments,getExercises,createExercise};
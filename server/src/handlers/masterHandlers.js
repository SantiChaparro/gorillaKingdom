const { User } = require('../db');
const {postNewUser,getAllUsers,getUser,getUserByPk,newPayment,createRoutine,modifyUser} = require('../controllers/masterControllers');
const Routine = require('../models/Routine');

const postUser = async (req,res)=>{

    const {dni,nombre,fecha_nacimiento,telefono,mail,domicilio} = req.body;

    const existingUser = await User.findByPk(dni);
    
    if(existingUser){
        res.send('Usuario ya registrado');
    }
    else{

        try {

            const newUser = await postNewUser(dni,nombre,fecha_nacimiento,telefono,mail,domicilio);

            res.status(200).json({ message: 'Usuario creado', newUser});
    
        } catch (error) {
            res.status(500).send(error.message);
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

    try {
        
        const newRoutine = await createRoutine(routineObj);

        res.status(200).json(newRoutine);

    } catch (error) {
        
        res.status(500).send(error.message);

    }

};

const updateUser = async (req,res) => {

    const {dni} = req.params;
    const {updatedData} = req.body;
    console.log(dni);
    console.log(updatedData)

    try {
  
            const updatedUser = await modifyUser(updatedData,dni);
            res.status(200).json(updatedUser);
        
    } catch (error) {
            res.status(500).send(error.message);
    }
};


module.exports = {postUser,getUsers,postPayment,postRoutine,updateUser};
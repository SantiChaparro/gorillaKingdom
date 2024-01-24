const { User } = require('../db');
const {postNewUser,getAllUsers,getUser,getUserByPk,newPayment} = require('../controllers/masterControllers');

const postUser = async (req,res)=>{

    const {dni,nombre,fecha_nacimiento,mail,domicilio} = req.body;

    const existingUser = await User.findByPk(dni);
    
    if(existingUser){
        res.send('Usuario ya registrado');
    }
    else{

        try {

            const newUser = await postNewUser(dni,nombre,fecha_nacimiento,mail,domicilio);

            res.status(200).json({ message: 'Usuario creado', newUser});
    
        } catch (error) {
            res.status(500).send(error.message);
        }

    }

};

const getUsers = async (req,res) => {

    try {

        const users = await getAllUsers();

        res.status(200).json(users);

    } catch (error) {
        
        res.status(500).send(error.message)
    }

    

};

const getUserByName = async (req,res) => {

    const {name} = req.query;
    console.log(name)

    try {
        
        const user = await getUser(name);

        if(user){

            res.status(200).json(user);
        }
        else{
            res.send('Usuario no encontrado')
        }

        
      

    } catch (error) {

        res.status(500).send(error.message)
    }

};

const getUserById = async (req,res) => {

    const {dni} = req.params;
    console.log (req.params)

    try {
        
        const user = await getUserByPk(dni);

        if(user){
            res.status(200).json(user);
        }
        else{
            res.send('Usuario no encontrado');
        }

    } catch (error) {
        
        res.status(500).send(error.message)

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

}


module.exports = {postUser,getUsers,getUserByName,getUserById,postPayment};
const { User } = require('../db');
const {postNewUser,getAllUsers} = require('../controllers/masterControllers');

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

const getUserByName = async (req,res) => {}

module.exports = {postUser,getUsers};
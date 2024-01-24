const { User,Payment,Routine } = require('../db');
const {Op} = require('sequelize');

const postNewUser = async (dni,nombre,fecha_nacimiento,mail,domicilio) => {

    const newUser = await User.create({dni,nombre,fecha_nacimiento,mail,domicilio});

    return newUser;
};

const getAllUsers = async () => {

    const users = await User.findAll();

    return users;
};

const getUser = async (name) => {

    const user = await User.findOne({
        where: {
            nombre: {
                [Op.iLike]: `%${name}%`,
            },
        },
    });

    return user; 
    


};

const getUserByPk = async (dni) => {

    const user = await User.findByPk(dni,{
        include:{
            model: Payment,
            attributes:['fecha_pago','monto']
        }
    });

    return user;

};

const newPayment = async (dni, fecha_pago , monto) => {

    const user = await User.findOne({where:{dni}});

    
    if(user){

        const payment = await Payment.create({fecha_pago , monto})

        await user.addPayment(payment);
        
        return payment;

    }
    else{
        console.error("No existe el usuario")
    }

    

};

module.exports = {postNewUser,getAllUsers,getUser,getUserByPk,newPayment};

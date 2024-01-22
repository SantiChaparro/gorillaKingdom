const { User } = require('../db');

const postNewUser = async (dni,nombre,fecha_nacimiento,mail,domicilio) => {

    const newUser = await User.create({dni,nombre,fecha_nacimiento,mail,domicilio});

    return newUser;
};

const getAllUsers = async () => {

    const users = await User.findAll();

    return users;
}

module.exports = {postNewUser,getAllUsers};

const usersMockuo = require ('./../mockups/usersMockuo.json');
const {User} = require ('../db');


const userLoader = async() => {

    const users = usersMockuo.users.map((user)=>{
        return {
            dni: user.dni,
            nombre: user.nombre,
            fecha_nacimiento: user.fecha_nacimiento,
            telefono: user.telefono,
            mail: user.mail,
            domicilio: user.domicilio,
            rol: user.rol,
            password: user.password
        }
    })

    await User.bulkCreate(users);

};

module.exports = userLoader
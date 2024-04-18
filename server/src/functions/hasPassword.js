const bcrypt = require('bcryptjs');

const hashPassword = async(password) => {

    const saltRounds = 10;

    const hash = await bcrypt.hash(password,saltRounds);
    
    console.log('desde funcion hash',hash)

    return hash;

};

module.exports ={hashPassword};
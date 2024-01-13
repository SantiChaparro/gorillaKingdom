const server = require('./src/server');
const { conn } = require('./src/db');
require('dotenv').config();
//const PORT = 3001;
const PORT = process.env.PORT

conn.sync({force: true}).then(async ()=>{

    server.listen(PORT,()=>{
        console.log(`Listening to port ${PORT}`);
    })    

}).catch(error => console.error(error))




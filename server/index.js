const server = require('./src/server');
require('dotenv').config();
//const PORT = 3001;
const PORT = process.env.PORT

server.listen(PORT,()=>{
    console.log(`Listening to port ${PORT}`);
})


const express = require('express');
const {PORT} = require('./config/serverConfig'); 
const bodyParser = require('body-parser');
const app = express();

const apiRoutes = require('./routes/index');

const prepareAndStartServer = ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));



    app.use('/api',apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}


prepareAndStartServer();

    


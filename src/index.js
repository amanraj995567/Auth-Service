const express = require('express');
const {PORT} = require('./config/serverConfig'); 
const bodyParser = require('body-parser');
const app = express();
const db = require('./models/index');
const apiRoutes = require('./routes/index');

const prepareAndStartServer =  ()=>{

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));



    app.use('/api',apiRoutes);


    app.listen(PORT, async () => {
        console.log(`Server is running on port: ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
        }



    });
}


prepareAndStartServer();

    


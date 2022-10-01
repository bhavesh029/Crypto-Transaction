const express = require("express");
const dotenv = require('dotenv');
const sequelize = require('./Util/db');
const apiRouter = require('./Routes/route');
const app = express();

dotenv.config();
app.use(apiRouter);

sequelize.sync()
    .then(() => {
        app.listen(3000, ()=>{
            console.log("Server is started");
        });
    })
    .catch(err => {
        console.log(err);
    })



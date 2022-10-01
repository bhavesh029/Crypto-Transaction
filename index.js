const express = require("express");

//const fetch = require('node-fetch');
const axios = require('axios');
const dotenv = require('dotenv');

const sequelize = require('./Util/db');

const apiRouter = require('./Routes/details');
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



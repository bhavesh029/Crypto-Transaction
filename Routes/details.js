const express = require('express');
const Router = express.Router();
const apiController = require('../controllers/details');

Router.use('/',apiController.getTransactions);

Router.get('/price', apiController.getEntheriumPrice);
Router.get('/balance', apiController.getUserBalance);``

module.exports = Router;
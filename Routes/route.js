const express = require('express');
const Router = express.Router();
const userTransaction = require('../controllers/userTransaction');
const userBalance = require('../controllers/userBalance');
const etheriumPrice = require('../controllers/etherumPrice');

Router.use('/getTransaction',userTransaction.getTransactions);

Router.get('/price', etheriumPrice.etheriumPrice);
Router.get('/balance', userBalance.userBalance);

module.exports = Router;
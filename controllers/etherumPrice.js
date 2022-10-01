const dotenv = require('dotenv');
const axios = require('axios');

const transactions = require('../model/transactions');
const user = require('../model/user');

exports.etheriumPrice = ((req, res) => {
    
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&amp;vs_currencies=inr';
    axios.get(url)
        .then(response => {
            let data = response.data;
            console.log(data);
            res.json({success: true, data});
        })
        .catch(err => {
            console.log(err);
        })
    });

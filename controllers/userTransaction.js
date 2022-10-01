const dotenv = require('dotenv');
const axios = require('axios');

const transactions = require('../model/transactions');
const user = require('../model/user');

dotenv.config();

exports.getTransactions = (async (req,res)=> {
    const address = req.query.address;
    const url = `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&page=1&offset=10&sort=asc&apikey=${process.env.APIKEY}`;
    console.log("================="+url);
    await axios.get(url)
        .then(response => {
            data = response.data.result;
            transactions.bulkCreate(data).then(() => {
                res.json({success: true, masg:"Successfully added to the database", data});
            }).catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(url+"====="+err);
        })
});


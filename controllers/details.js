const dotenv = require('dotenv');
const axios = require('axios');

const transactions = require('../model/transactions');
dotenv.config();
exports.getTransactions = ((req,res)=> {
    const address = req.query.address;
    const url = `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&page=1&offset=10&sort=asc&apikey=${process.env.APIKEY}`;
    console.log("================="+url);
    axios.get(url)
        .then(response => {
            data = response.data.result;
            console.log(data);
            res.json({success: true, data});
        })
        .catch(err => {
            console.log(url+"====="+err);
        })
});

exports.getEntheriumPrice = ((req, res) => {
    const URL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&amp;vs_currencies=inr';
    axios.get(URL)
        .then(response => {
            let data = response.data;
            console.log(data);
            res.json({success: true, data});
        })
        .catch(err => {
            console.log(err);
        })
    });

    exports.getUserBalance = ((req, res) => {
        const address = req.query.address;
        const url = `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&page=1&offset=10&sort=asc&apikey=${process.env.APIKEY}`;
        console.log("================="+url);
        axios.get(url)
            .then((response) =>{
                const data = response.data.result;
                let total = 0;
                data.forEach(element => {
                    if(element.to == address){
                        total +=  element.value;
                    }
                    if(element.from == address){
                        total -= element.value;
                    }
                });
                console.log(data);
                res.json({success: true, total});
            })
            .catch(err => {
                console.log(err)
            })
    })
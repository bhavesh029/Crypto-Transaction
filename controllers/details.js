const dotenv = require('dotenv');
const axios = require('axios');

const transactions = require('../model/transactions');
const user = require('../model/user');

dotenv.config();

exports.getTransactions = ((req,res)=> {
    const address = req.query.address;
    const url = `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&page=1&offset=10&sort=asc&apikey=${process.env.APIKEY}`;
    console.log("================="+url);
    axios.get(url)
        .then(response => {
            data = response.data.result;
            transactions.bulkCreate(data).then(() => {
                res.json({success: true, masg:"Successfully added to the database", data});
            }).catch(err => {
                console.log(err);
            });
            // res.json({success: true, data});
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

    exports.getUserBalance = ((req, res, next) => {
        const address = req.query.address;
        const url = `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&page=1&offset=10&sort=asc&apikey=${process.env.APIKEY}`;
        console.log("================="+url);
        axios.get(url)
            .then((response) =>{
                const data = response.data.result;
                let balance = 0;
                data.forEach(element => {
                    if(element.to == address){
                        balance +=  element.value;
                    }
                    if(element.from == address){
                        balance -= element.value;
                    }
                });
                user.create({address,balance}).then(()=> {
                    res.json({success: true ,msg:"Successfully added in database" ,balance});
                })
            })
            .catch(err => {
                console.log(err)
            })
    })
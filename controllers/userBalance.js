const dotenv = require('dotenv');
const axios = require('axios');

const transactions = require('../model/transactions');
const user = require('../model/user');


exports.userBalance = (async (req, res, next) => {
    const address = req.query.address;
    const url = `https://api.etherscan.io/api?module=account&action=txlistinternal&address=${address}&startblock=0&endblock=2702578&page=1&offset=10&sort=asc&apikey=${process.env.APIKEY}`;
    console.log("================="+url);
    await  axios.get(url)
        .then( (response) =>{
            axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&amp;vs_currencies=inr").then((price) => {
                const data = response.data.result;
                let ethereum = price.data.ethereum.inr;
                let balance = 0;
                data.forEach(element => {
                    if(element.to == address){
                        balance +=  element.value;
                    }
                    if(element.from == address){
                        balance -= element.value;
                    }
                });
                user.create({address, ethereum, balance}).then(()=> {
                    res.json({success: true ,msg:"Successfully added in database" ,balance, ethereum});
                })
            })
            .catch(err => {
                console.log(err);
            })
            
        })
        .catch(err => {
            console.log(err)
        })
});

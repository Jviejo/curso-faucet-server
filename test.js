const Web3 = require("web3")
const dotenv = require("dotenv");
const ethers = require("ethers")
dotenv.config();

const web3 = new Web3("http://172.25.224.1:7545", { chainId: 1337 });



 
web3.eth.getTransactionCount(process.env.ADDRESS).then(nonce => {
    web3.eth.accounts.signTransaction({
        nonce: nonce,
        to: process.env.TO,
        value: ethers.utils.parseEther("10").toHexString(),
        gas: 2000000
    }, '0x' + process.env.PRIVATE_KEY)
        .then(
            (tx) => {
                web3.eth.sendSignedTransaction(
                    tx.rawTransaction
                ).then((tx)=>{
                    console.log(tx)
                    const balance = web3.eth.getBalance(process.env.TO).then(console.log)
                })
                    .catch(console.log)
            }
        )
})
const Web3 = require("web3")
const cors = require("cors")
const express = require("express")
const dotenv = require("dotenv");
const res = require("express/lib/response");
const ethers = require("ethers")
const app = express();
app.use(cors())
var Tx = require('ethereumjs-tx').Transaction;
dotenv.config();

const web3 = new Web3("http://localhost:7545")

app.get("/balance/:cuenta" , async(req, res) => {
    console.log(req.params.cuenta)
    const balance = await web3.eth.getBalance(req.params.cuenta)
    res.send({balance})
})
app.get("/enviar/:cuenta", async (req, res) => {
    console.log(req.params.cuenta)
    const nonce = await web3.eth.getTransactionCount(process.env.ADDRESS)
    const tx = await web3.eth.accounts.signTransaction({
        nonce: nonce,
        to: req.params.cuenta,
        value: ethers.utils.parseEther("10").toHexString(),
        gas: 2000000
    }, '0x' + process.env.PRIVATE_KEY)
    const txSended = await web3.eth.sendSignedTransaction(
        tx.rawTransaction
    )
    const balance = await web3.eth.getBalance(req.params.cuenta)
    res.send({balance})
})

app.listen(4444, () => {
    console.log('listen to 4444');
})

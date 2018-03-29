const ChainUtil = require('../chain-utils');
const {INITIAL_BALANCE} = require('../config');
class Wallet {
    constructor(){
        this.balance = INITIAL_BALANCE;
        this.keypair = ChainUtil.genKeyPair();
        this.publicKey = this.keypair.getPublic().encode('hex');
    }    

    toString(){
        return `Wallet - 
            publicKey : ${this.publicKey.toString()}
            balance   : ${this.balance}`
    }
    sign(dataHash){
        return this.keypair.sign(dataHash);
    }
}
module.exports = Wallet;
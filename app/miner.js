class Miner{
    constructor(blockchain,transactionPool,wallet,p2pServer){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }

    mine(){
        const validTransaciton = this.transactionPool.validTransaciton();
        // include a reward for the miner
        // create a block consisting of the valide transactions
        // syschronize the chains in the peer-to-peer server
        // clear the transaction pool
        // broadcast to every miner to clera ther transaction pools


    }
}

module.exports = Miner;
const Block = require('./block');

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];
    }
    addBlock(data){
        // const lastBlock = this.chain[this.chain.length-1];
        const block = Block.mineBlock(this.chain[this.chain.length-1], data);
        this.chain.push(block);
        return block;
    }

    isValidChain(newChain) {
        if (JSON.stringify(newChain[0]) !== JSON.stringify(Block.genesis())) 
            return false;
        for (let i=1; i<newChain.length; i++) {
          const block = newChain[i];
          const lastBlock = newChain[i-1];
          if (
            block.prevHash !== lastBlock.hash 
            ||
            block.hash !== Block.blockHash(block)
          ) {
            return false;
          }
        }

        return true;
      }

      replaceChain(newChain){
          if(newChain.length <= this.chain.length) {
              console.log('Received chain is not longer than the current chain.');
              return;
          } else if ( !this.isValidChain(newChain)){
              console.log('The received chain is not valid.');
              return;
          }
          console.log('Replacing blockchain with the new chain.');
          this.chain = newChain;
      }
}

module.exports = Blockchain;
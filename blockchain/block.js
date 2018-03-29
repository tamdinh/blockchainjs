const ChainUtil = require('../chain-utils');
const { DIFFICULTY, MINE_RATE } = require('../config');

class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.prevHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString() {
        return `Block - 
           Timestamp : ${this.timestamp}
           Last Hash : ${this.prevHash}
           Hash      : ${this.hash}
           Nonce     : ${this.nonce}
           Difficulty: ${this.difficulty}
           Data      : ${this.data} `;
    }
    static genesis() {
        return new this('Gennesis time', '-----', 'f1r57-h45h', [], 0, DIFFICULTY)
    }
    static mineBlock(lastBlock, data) {
        const prevHash = lastBlock.hash;
        let hash, timestamp;
        let nonce = 0;
        let { difficulty } = lastBlock;
        // const timestamp = Date.now();
        // const prevHash = lastBlock.hash;

        // const hash = Block.hash(timestamp,prevHash,data);
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, prevHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, prevHash, hash, data, nonce, difficulty);
    }

    static hash(timestamp, prevHash, data, nonce, difficulty) {
        return ChainUtil.hash(`${timestamp}${prevHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block) {
        const { timestamp, prevHash, data, nonce, difficulty } = block;
        return Block.hash(timestamp, prevHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}

module.exports = Block;
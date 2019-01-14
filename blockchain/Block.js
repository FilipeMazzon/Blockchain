const SHA256 = require('crypto-js/sha256');
const {DIFFICULTY, MINE_RATE} = require('../config');

class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString() {
        return `Block  -
        Timestamp:${this.timestamp}
        Last Hash:${this.lastHash.substring(0, 10)}
        Hash:${this.hash.substring(0, 10)}
        Nonce: ${this.nonce}
        Difficulty: ${this.difficulty}
        data:${this.data}`;
    }

    static genesis() {
        return new this('Genisis time', '------', 'f1r57-h45h', [], 0);
    }

    static mineBlock(lastBlock, data) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let {difficult} = lastBlock;

        let nonce = -1;
        do {
            nonce++;
            timestamp = Date.now();
            difficult = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data, nonce, difficult);
        } while (hash.substring(0, difficult) !== '0'.repeat(difficult));


        return new this(timestamp, lastHash, hash, data, nonce, difficult);
    }

    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block) {
        const {timestamp, lastHash, data, nonce, difficulty} = block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime) {
        let {difficult} = lastBlock;
        return lastBlock.timestamp + MINE_RATE > currentTime ? difficult + 1 : difficult - 1;
    }
}

module.exports = Block;
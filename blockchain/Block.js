const ChainUtil = require('../Chain-Util');
const {DIFFICULTY} = require('../config');

class Block {
    constructor(timestamp, lastHash, hash, data, nonce) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    toString() {
        return `Block  -
        Timestamp:${this.timestamp}
        Last Hash:${this.lastHash.substring(0, 10)}
        Hash:${this.hash.substring(0, 10)}
        Nonce: ${this.nonce}
        data:${this.data}`;
    }

    static genesis() {
        return new this('Genisis time', '------', 'f1r57-h45h', [], 0);
    }

    static mineBlock(lastBlock, data) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;

        let nonce = -1;
        do {
            nonce++;
            timestamp = Date.now();
            hash = Block.hash(timestamp, lastHash, data, nonce);
        } while (hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));


        return new this(timestamp, lastHash, hash, data, nonce);
    }

    static hash(timestamp, lastHash, data, nonce) {
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}`).toString();
    }

    static blockHash(block) {
        const {timestamp, lastHash, data, nonce} = block;
        return Block.hash(timestamp, lastHash, data, nonce);
    }
}

module.exports = Block;
'use strict';
const ChainUtil = require('../Chain-Util');

const {INITIAL_BALANCE} = require('../config');

class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString() {
        return `
            Wallet -
            publicKey: ${this.publicKey.toString()}
            Balance: ${this.balance}
        `
    }

    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }
}

module.exports = Wallet;
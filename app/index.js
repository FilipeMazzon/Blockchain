const express = require('express'),
    logger = require('morgan'),
    http = require('http');

const Blockchain = require('../blockchain'),
    P2pServer = require('./P2pServer');

const port = process.env.HTTP_PORT || 3000;

const index = express();
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

index.set('port', port);
index.use(express.json());
index.use(express.urlencoded({extended: false}));
index.use(logger('dev'));

const server = http.createServer(index);

server.listen(index.get('port'), () => {
    console.log(`Express server listening on port ${index.get('port')}`);
});

p2pServer.listen();

index.get('/blocks', (req, res) => {
    res.json(bc);
});

index.post('/mine', (req, res) => {
    const {data} = req.body;
    const block = bc.addBlock(data);

    p2pServer.syncChain();

    res.redirect('/blocks');
});
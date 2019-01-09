var express = require('express');
var router = express.Router();

// define the home page route
router.get('/blocks', (req, res) => {
    console.log('im here');
    console.log(process.env.bc.chain);
    res.json(process.env.bc.chain);
});

module.exports = router;
var express = require('express');
let router = express.Router();

var api = require('../lib/api');

router.get('/posts/:quantity', function(req, res) {
    res.status(200).send({
        posts: api.getPosts(req.params['quantity'])
    });
});

module.exports = router;

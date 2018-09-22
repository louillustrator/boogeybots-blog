var express = require('express');
let router = express.Router();

var api = require('../helpers/api');

router.get('/posts/', function (req, res) {
    let filename = req.query.post;
    if (filename) {
        res.send(`Should display ${filename}.md`);
    } else {
        let posts = req.query.howMany;
        let offset = req.query.offset;

        res.status(200).send({
            posts: api.getPosts(posts, offset)
        });
    }
});

module.exports = router;

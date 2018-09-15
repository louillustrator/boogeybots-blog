var express = require('express');
let router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('posts/index', { title: 'BoogeyBots - Posts', activeItem: 'Posts' });
});

module.exports = router;

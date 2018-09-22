var express = require('express');
let router = express.Router();
var posts = require('../helpers/posts');

/* GET home page. */
router.get('/', function(req, res, next) {
    let filename = req.query.post;
    if (filename) {
        // TODO get post after page load with AJAX
        let post = posts.readPost(filename);
        res.render('posts/post', { title: `BoogeyBots - ${post.title}`, post: post});
    } else {
        res.render('posts/index', { title: 'BoogeyBots - Posts', activeItem: 'Posts' });
    }
});

module.exports = router;

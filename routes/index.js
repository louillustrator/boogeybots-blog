var express = require('express');
let router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'BoogeyBots - Home', activeItem: 'Home' });
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'BoogeyBots - About', activeItem: 'About' });
});

router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'BoogeyBots - Contact', activeItem: 'Contact' });
});

module.exports = router;

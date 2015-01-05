var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('add', {
        title: 'MAKE A NEW POST'
    });
});

router.post('/submit', function(req, res) {
    var title = req.body.title;
    var body = req.body.content;
    var url_name = title.replace(/\s/g, '_');
    var models = require('../models/');
    var number = 2;

	var p = new models.Page({ 'title': title, 'body': body, 'url_name': url_name });
	p.save();
    res.redirect('/');
});

module.exports = router;
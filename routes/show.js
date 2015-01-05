var express = require('express');
var router = express.Router();
var models = require('../models/').Page;

/* GET wiki pages. */
router.get('/:url_name', function(req, res) {
	var url_name = req.params.url_name;
	
	models.findOne({'url_name': url_name}, function(err, page){
		if (err) return handleError(err);
		res.render('show', {title: page.title, content: page.body, url_name: page.url_name})
	});

});

router.get('/:url_name/edit', function(req, res) {
	var url_name = req.params.url_name;

	models.findOne({'url_name': url_name}, function(err,page){
		if (err) return handleError(err);
		res.render('edit', {title: page.title, content: page.body, url_name: page.url_name})
	});
});

router.get('/:url_name/delete', function(req, res) {
	var url_name = req.params.url_name;
	
	models.findOneAndRemove({'url_name': url_name}, function(err, result){
		if (err) return handleError(err);
		res.redirect('/');
	})
}) 

router.post('/:url_name/edit', function(req, res){
	var url_name = req.params.url_name;
	var update = {title: req.body.title, body: req.body.content};

	models.findOneAndUpdate({'url_name': url_name}, {$set: update}, {upsert: true, safe: true}, function(err, result){
		res.redirect('/wiki/'+ url_name);
	});
})

module.exports = router;
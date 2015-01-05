var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var models = require('../models/').Page;

	var docs = models.find(function(err, pages){
		if (err) return handleError(err);
		res.render('index', {title: 'BROWSE MY WIKISTACK', docs: pages})
	});

});

module.exports = router;

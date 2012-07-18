var express = require('express');
var expressHogan = require('./lib/express-hogan'); // require('express-hogan.js')

var app = express.createServer();

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.engine('hjs', expressHogan.renderFile);
});

app.get('/', function(req, res) {
	res.locals = {
		title: 'Express test',
		message: 'using Hogan templating system'
	};
	return res.render('index.hjs');
});

app.listen(3000);

console.log('Express server listening on port 3000');

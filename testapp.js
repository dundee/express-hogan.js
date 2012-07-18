var express = require('express');
var expressHogan = require('./lib/express-hogan'); // require('express-hogan.js')

var app = module.exports = express.createServer();

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.engine('hjs', expressHogan.renderFile);
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	return app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	return app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.configure('production', function() {
	return app.use(express.errorHandler());
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

var expressHogan = require('../lib/express-hogan');

exports.testSimpleCompile = function(test){
    test.equals('test', expressHogan.compile('test')({locals: {}}));

	test.equals('test-1', expressHogan.compile('test-{{aa}}')({locals: {aa: 1}}));

	test.equals('<html><h1>Hello</h1></html>', expressHogan.compile(
		'<html>{{{message}}}</html>'
	)({locals: {
		message: '<h1>Hello</h1>'
	}}));

    test.done();
};

exports.testComplexCompile = function(test){

	var template = expressHogan.compile('<h1>{{message}}</h1>');
	var layout = expressHogan.compile('<html>{{{body}}}</html>');

	output = layout({locals: {
		body: template({locals: {
			message: 'Hello'
		}})
	}});
	test.equals('<html><h1>Hello</h1></html>', output);

    test.done();
};

exports.testCompilePartials = function(test){

	expressHogan.preparePartials(__dirname + '/data', ['part'], function(partials){
		var output = expressHogan.compile('p:{{> part}}')({
			locals: {},
			partials: partials
		});
		test.equals('p:partial\n', output);
		
		test.done();
	});
};

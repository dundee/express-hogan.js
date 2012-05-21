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

	expressHogan.preparePartials(__dirname + '/data', ['part', 'part2'], function(partials){
		var output = expressHogan.compile('p:{{> part}} {{> part2}}')({
			locals: {},
			partials: partials
		});
		test.equals('p:partial\n partial2\n', output);

		test.done();
	});
};

exports.testCompileWithDynamicHelpers = function(test){

	var options = {'app':{}};
	options.app.dynamicViewHelpers = {foo:'Foo'};
	options.foo = 'Foo';

	var output = expressHogan.compile('<h1>{{foo}}</h1>')(options);
	test.equals('<h1>Foo</h1>', output);

	test.done();
}

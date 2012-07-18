var expressHogan = require('../lib/express-hogan');

exports.testSimpleCompile = function(test){
    test.equals('test', expressHogan.render('test', {locals: {}}));

	test.equals('test-1', expressHogan.render('test-{{aa}}', {locals: {aa: 1}}));

	test.equals('<html><h1>Hello</h1></html>', expressHogan.render(
		'<html>{{{message}}}</html>',
		{locals: {
			message: '<h1>Hello</h1>'
		}})
	);

    test.done();
};

exports.testComplexCompile = function(test){

	var template = expressHogan.render('<h1>{{message}}</h1>', {locals: { message: 'Hello' }});
	output = expressHogan.render('<html>{{{body}}}</html>', {locals: { body: template }});

	test.equals('<html><h1>Hello</h1></html>', output);

    test.done();
};

exports.testCompilePartials = function(test){

	expressHogan.preparePartials(__dirname + '/data', ['part', 'part2'], function(partials){
		var output = expressHogan.render('p:{{> part}} {{> part2}}', {
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

	var output = expressHogan.render('<h1>{{foo}}</h1>', options);
	test.equals('<h1>Foo</h1>', output);

	test.done();
}

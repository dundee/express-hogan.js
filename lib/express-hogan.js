var hogan = require('hogan.js');
var fs = require('fs');
var _ = require('underscore');


(function (expressHogan) {
	expressHogan.compile = function(source) {
		if (typeof source == 'string') {
			return function(options) {
				return expressHogan.render(source, options);
			}
		}
	}

	expressHogan.renderFile = function(path, options, callback) {
		fs.readFile(path, function(err, data) {
			if (err) {
				callback(err);
			}

			callback(null, expressHogan.render(data.toString('utf8'), options));
		});
	};

	expressHogan.render = function(source, options) {
		options.locals = options.locals || {};
		options.partials = options.partials || {};

		if (options.body) {
			options.locals.body = options.body;
		}
		if (options.app && options.app.dynamicViewHelpers) {
			for (var i in options.app.dynamicViewHelpers) {
				options.locals[i] = options[i];
			}
		}

		var template = hogan.compile(source);

		for (var i in options.partials) {
			if (typeof options.partials[i].r == 'function') continue;
			options.partials[i] = hogan.compile(options.partials[i]);
		}

		return template.render(options.locals, options.partials);
	};

	expressHogan.preparePartials = function(root, partials, func) {
		var sources = {};
		var ready = _.after(partials.length, func);
		for (var i in partials) {
			(function(i) {
				fs.readFile(root + '/' + partials[i] + '.hjs', function(err, data) {
					if (err) {
						console.log(err);
						return;
					}
					sources[partials[i]] = data.toString('utf8');
					ready(sources);
				});
			})(i);
		}
	};
})(typeof exports !== 'undefined' ? exports : expressHogan);

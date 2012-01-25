var hogan = require('hogan.js');
var fs = require('fs');
var _ = require('underscore');


(function (expressHogan) {
	expressHogan.compile = function(source, options) {
		if (typeof source == 'string') {
			return function(options) {
				options.locals = options.locals || {};
				options.partials = options.partials || {};

				if (options.body) {
					options.locals.body = options.body;
				}

				var template = hogan.compile(source);

				for (var i in options.partials) {
					if (typeof options.partials[i].r == 'function') continue;
					options.partials[i] = hogan.compile(options.partials[i]);
				}

				return template.render(options.locals, options.partials);
			};
		} else {
			return source;
		}
	};
	expressHogan.preparePartials = function(root, partials, func) {
		var sources = {};
		var ready = _.after(partials.length, func);
		for (var i in partials) {
			fs.readFile(root + '/' + partials[i] + '.html', function(err, data) {
				if (err) {
					console.log(err);
					return;
				}
				sources[partials[i]] = data.toString('utf8');
				ready(sources);
			});
		}
	};
})(typeof exports !== 'undefined' ? exports : expressHogan);

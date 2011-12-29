var hogan = require('hogan.js');

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
					hogan.compile(options.partials[i]);
					options.partials[i] = hogan.compile(options.partials[i]);
				}

				return template.render(options.locals, options.partials);
			};
		} else {
			return source;
		}
	};
})(typeof exports !== 'undefined' ? exports : expressHogan);

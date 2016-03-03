var _ = require('lodash');

module.exports = function ($q, config) {
	var logic = {
		'translate/dictionary\\.json': function (request) {
			return rejectOrReplaceUrl(request, config.language.dictionary);
		}
	};

	function rejectOrReplaceUrl (request, condition, value) {
		if (condition) {
			if (value || _.isString(condition)) {
				request.url = value ? value : condition;
			}
		} else {
			return $q.reject(request);
		}
		return request;
	}

	function process (request) {
		_.forEach(logic, function (replacement, pattern) {
			if (new RegExp(pattern).test(request.url)) {
				if (_.isRegExp(replacement)) {
					request.url = request.url.replace(replacement);
				} else if (_.isFunction(replacement)) {
					request = replacement(request);
				} else {
					request.url = replacement;
				}
			}
		});
		return request;
	}

	return {
		request: function (request) {
			return process(request);
		}
	};
};

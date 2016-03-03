module.exports = function (config, $rootScope) {
	$rootScope.language = config.language;
	$rootScope.language.set = function (code) {
		$rootScope.language.code = code;
	};
	return {
		restrict: 'A'
	};
};
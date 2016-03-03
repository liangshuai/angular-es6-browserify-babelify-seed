angular.module('translate', ['config']).
	factory('translate', require('./translate-service')).
	directive('translate', require('./translate-directive')).
	filter('translate', require('./translate-filter'));
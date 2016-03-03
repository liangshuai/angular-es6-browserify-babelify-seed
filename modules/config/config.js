angular.module('config', []).
	value('config', require('config/config-json')).
	factory('configInterceptor', require('config/config-service-interceptor')).
	config(function ($httpProvider) {
		$httpProvider.interceptors.push('configInterceptor');
	});
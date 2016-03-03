module.exports = function ($http) {
	var dictionary = {};

	$http.get('translate/dictionary.json').then(function (response) {
		dictionary = response.data;
	}).catch(function () {
		dictionary = require('translate/dictionary/dictionary');
	});

	return function (value, language) {
		return dictionary[value] && dictionary[value][language.code] ? dictionary[value][language.code] : language.placeholder;
	};
};

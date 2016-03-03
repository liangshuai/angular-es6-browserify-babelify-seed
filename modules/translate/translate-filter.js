module.exports = function (translate) {
	return function (value, language) {
		return translate(value, language);
	};
};

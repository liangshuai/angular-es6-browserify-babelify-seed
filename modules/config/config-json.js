var _ = require('lodash');

module.exports = _.merge({},
	require('./json/config-default.json'),
	require('./json/config-environment.json'), // alias
	require('./json/config-override.json')
	);

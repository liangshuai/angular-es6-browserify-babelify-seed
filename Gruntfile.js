var pkg = require('./package.json');
var _ = require('lodash');

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-string-replace');

	grunt.registerTask('default', ['clean', 'test', 'package']);
	grunt.registerTask('dev', ['connect', 'dev-watch']);
	grunt.registerTask('dev-watch', ['eslint', 'package', 'watch']);
	grunt.registerTask('test', ['eslint' /*, 'jasmine', 'report',*/ ]); // TODO test
	grunt.registerTask('package', ['version', 'copy:modules', 'copy:resources', 'string-replace', 'browserify', 'less']);

	var environment = grunt.option('env') ? grunt.option('env') : 'DEV';
	var debug = grunt.option('debug');
	var version = pkg.version + '+' + grunt.template.date(new Date(), 'yyyymmddhhmmss');
	var overrides = 'modules/config/json/config-override.json';

	grunt.log.ok('Environment ' + environment + (debug ? ' (debug)' : '') + ' version ' + version);
	if (!grunt.file.exists(overrides)) {
		grunt.log.ok('Created ' + overrides + ' for your convenience.');
		grunt.file.write(overrides, '{\n}\n');
	}

	grunt.registerTask('version', function() {
		grunt.file.write('dist/version.txt', version);
	});

	grunt.initConfig({
		package: pkg,
		clean: {
			all: ['dist']
		},
		connect: {
			server: {
				options: {
					port: 8888,
					base: 'dist'
				}
			}
		},
		eslint: {
			options: {
				format: 'stylish',
				configFile: 'eslint.json'
			},
			target: ['*.js', '*.json', 'modules/**/*.js', 'resources/**/*.json']
		},
		watch: {
			modules: {
				files: ['*.js', '*.json', './modules/**', './resources/**'],
				tasks: ['dev-watch']
			}
		},
		copy: {
			modules: {
				expand: true,
				cwd: 'modules',
				src: ['**', '!**/*.js', '!**/*.less', '!**/*.json'],
				dest: 'dist/'
			},
			resources: {
				expand: true,
				cwd: 'resources',
				src: ['**'],
				dest: 'dist/'
			}
		},
		'string-replace': {
			dist: {
				files: {
					'dist/index.html': 'modules/index.html'
				},
				options: {
					replacements: [{
						pattern: /\$VERSION/g,
						replacement: encodeURIComponent(version)
					}]
				}
			}
		},
		less: {
			modules: {
				options: {
					paths: ['modules/'],
					compress: !debug,
					sourceMap: debug,
					sourceMapFileInline: debug
				},
				files: {
					'dist/index.css': 'modules/index.less'
				}
			}
		},
		browserify: {
			modules: {
				options: {
					alias: _.concat(
						['./modules/config/json/config-environment-' + environment + '.json:./json/config-environment.json'],
						require('browserify-alias-grunt').map(grunt, [{
							cwd: 'modules',
							src: ['**/*.js', '**/*.json'],
							dest: ''
						}])),
					browserifyOptions: {
						debug: debug,
					},
					transform: debug ?
						[
							['babelify', {
								loose: 'all'
							}]
						] : [
							['uglifyify', {
								'global': true,
								'compress': true,
								'mangle': false
							}],
							['babelify', {
								loose: 'all'
							}]
						]
				},
				src: 'modules/index.js',
				dest: 'dist/index.js'
			}
		}
	});
};
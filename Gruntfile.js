const credentials = require('./.screeps.json');

module.exports = function(grunt) {
	grunt.initConfig({
		screeps: {
			options: {
				email: credentials.email,
				password: credentials.password,
				branch: credentials.branch,
				ptr: credentials.ptr
			},
			dist: {
				src: ['src/*.js']
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'min',
					clearRequireCache: true
				},
				src: ['test/*.js']
			},
		},
		watch: {
			js: {
				options: {
					spawn: true,
					interrupt: true,
					debounceDelay: 250,
				},
				files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', '!test/screepsAutocomplete.js'],
				tasks: ['mochaTest']
			}
		},
		mocha_istanbul: {
			coverage: {
				src: 'test', // a folder works nicely
				options: {
					mask: '*.spec.js'
				}
			}
		},
		uglify: {
			options: {
				mangle: false,
				beautify: true,
				compress: false
			},
			my_target: {
				files: {
					'test/screepsAutocomplete.js': ['ScreepsAutocomplete/**/*.js']
				}
			}
		},
		"regex-replace": {
			replace: {
				src: ['test/screepsAutocomplete.js'],
				actions: [{
						search: '(.*) = function',
						replace: 'global.$1 = function',
						flags: 'g'
					},
					{
						search: 'const ',
						replace: 'global.',
						flags: 'g'
					},
					{
						search: '(.*) = {}',
						replace: 'global.$1 = {}',
						flags: 'g'
					},
					{
						search: 'Game = {',
						replace: 'global.Game = {',
						flags: 'g'
					},
					{
						search: 'Order = {',
						replace: 'global.Order = {',
						flags: 'g'
					},
					{
						search: 'PathFinder = {',
						replace: 'global.PathFinder = {',
						flags: 'g'
					},
					{
						search: 'Room = {',
						replace: 'global.Room = {',
						flags: 'g'
					},
					{
						search: 'Spawn = StructureSpawn;',
						replace: 'global.Spawn = StructureSpawn;',
						flags: 'g'
					},
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-screeps');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-regex-replace');
	grunt.loadNpmTasks('grunt-mocha-istanbul');

	// grunt.registerTask('default', ['mochaTest']);
	grunt.registerTask('test', ['mochaTest']);
	grunt.registerTask('prepare', ['uglify', 'regex-replace']);
	grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
};

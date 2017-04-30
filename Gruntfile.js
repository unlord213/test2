module.exports = function(grunt) {
  grunt.initConfig({
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
    // concat: {
    //   options: {
    //     stripBanners: true
    //   },
    //   // options: {
    //   // separator: ';',
    //   // },
    //   dist: {
    //     src: ['ScreepsAutocomplete/**/*.js'],
    //     dest: 'test/screepsAutocomplete.js',
    //   },
    // },
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
        actions: [
          {
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
        //  {
        //   name: 'foo',
        //   search: 'var v = \'[^\']*\';',
        //   replace: 'var v = \'<%= pkg.release.version_code %>\';',
        //   flags: ''
        // }, {
        //   name: 'foobar',
        //   search: new RegExp('\\w+'),
        //   replace: function() {
        //     return 'foofoo';
        //   }
        // }, {
        //   name: 'baz',
        //   use: function(data) {
        //     return data.sourceContent.length > 3;
        //   },
        //   search: 'abc',
        //   replace: 'abcde'
        // }
      ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-regex-replace');

  // grunt.registerTask('default', ['mochaTest']);
  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('prepare', ['uglify', 'regex-replace']);
};

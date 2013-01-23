/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.

  grunt.initConfig({

    // Pkg
    // ----------------
    // Reads properties from the package.json file

    pkg: '<json:package.json>',

    // Handlebars Client
    // -----------
    handlebars: {
      compile: {
        options: {
          namespace: "EmberApp.tmpl"
        },
        files: {
          "app/tmpl.js": "app/templates/**/*.hbs"
        }
      }
    },

    // Lint
    // ---------
    // What files should be lint:ed

    lint: {
      files: ['grunt.js', 'app/**/*.js']
    },

    // Concat
    // -----------------
    // Contains different concat tasks,

    concat: {
      dist: {
        src: [
          'components/jquery/jquery.js',
          'components/handlebars.js/handlebars.js',
          'components/ember/ember.js',
          'components/ember-rest/src/ember-rest.js',
          'app/**/*.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    // Min
    // -----------------------
    // contains min-tasks that minifies the concated files above.

    min: {
      dist: {
        src: ['<config:concat.dist.dest>'],
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },

    // Less
    // -------------------------
    // compiles less to css

    less: {
      development: {
        options: {
          paths: ['css'],
          compress: false,
          yuicompress: false
        },
        files: {
          'dist/css/app.css': 'css/app.less'
        }
      },
      production: {
        options: {
          paths: ['css'],
          compress: true,
          yuicompress: true
        },
        files: {
          'dist/css/app.min.css': 'css/app.less'
        }
      }
    },

    // Watch
    // -------------------------
    // Specify a couple of filesystem watches
    // that runs specified tasks if any of the files change.

    watch: {
      tmpl: {
        files: 'app/templates/**/*.hbs',
        tasks: 'handlebars lint concat min reload'
      },
      js: {
        files: '<config:lint.files>',
        tasks: 'lint concat min reload'
      },
      test: {
        files: ['app/**/*.js', 'test/**/*.js', 'test/*.html'],
        tasks: 'mocha'
      },
      css: {
        files: 'css/**/*.less',
        tasks: 'less reload'
      }
    },

    // Server
    // ----------------
    // starts a simple http server to serve the files.

    server: {
      port: 8080,
      base: 'dist'
    },

    // Reload
    // ----------------
    // starts a reload proxy that can automatically refresh the browser when
    // css/js etc has changed.

    reload: {
      port: 8081,
      proxy: {
        host: 'localhost',
        port: 8080
      }
    },

    // Jshint
    // ------------------

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true,
        Hogan: true,
        EmberApp: true,
        $: true,
        console: true,
        Ember: true,
        Em: true,
        _: true,
        describe: true,
        it: true,
        before: true,
        beforeEach: true,
        after: true,
        afterEach: true,
        expect: true,
        sinon: true
      }
    },
    uglify: {},

    // Mocha
    // ---------------
    // uses phantomjs to evaluate tests.

    mocha: {
      // runs all html files in the test dir
      all: [ 'test/**/*.html' ]
    },

    docco: {
      app: {
        src: ['app/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-data-uri');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-docco');

  // Default task.
  grunt.registerTask('default', 'handlebars lint concat min less server reload mocha watch');

};

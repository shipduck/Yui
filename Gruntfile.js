module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bowerrc: grunt.file.readJSON('.bowerrc'),
    bowercopy: {
      options: {
        clean: false
      },
      glob: {
        files: {
          'publish/libs/js': ['assert/*.js',
                              'bootstrap/dist/js/*.js',
                              'jquery/dist/*.js',
                              'mocha/*.js',
                              'pixijs/bin/*.js',
                              'requirejs/*.js'],
          'publish/libs/css': ['bootstrap/dist/css/*.css',
                               'mocha/*.css'],
          'publish/libs/fonts': ['bootstrap/dist/fonts/*']
        }
      }
    },
    coffee: {
      compile: {
        files: {
          'publish/js/main.js': ['src/js/config.coffee', 'src/js/main.coffee']
        }
      },
      glob_to_multiple: {
        expand: true,
        flatten: false,
        cwd: 'src/js/ui',
        src: ['*.coffee'],
        dest: 'publish/js/ui/',
        ext: '.js'
      }
    },
    htmlmin: {
      dist: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        collapseBooleanAttributes: true,
        files: {
          'publish/index.htm': 'src/index.htm'
        }
      },
      dev: {
        files: {
          'publish/index.htm': 'src/index.htm'
        }
      }
    },
    less: {
      development: {
        files: {
          'publish/css/style.css': ['src/css/main.less', 'src/css/fonts.less']
        }
      },
      production: {
        files: {
          'publish/css/style.css': ['src/css/main.less', 'src/css/fonts.less']
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, flatten: true, src: ['res/**'], dest: 'publish/res', filter: 'isFile'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['coffee', 'bowercopy', 'htmlmin', 'less', 'copy']);
};

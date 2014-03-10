module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
      install: {
        targetDir: root + '/lib',
        layout: 'byComponent',
        bowerOptions: {
          production: true
        }
      },
      target: {
        rjsConfig: root + '/js/main.js'
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

  grunt.loadNpmTasks('grunt-bower');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('build', ['coffee', 'bower', 'htmlmin', 'less', 'copy']);
};

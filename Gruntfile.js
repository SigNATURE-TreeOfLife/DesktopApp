module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    clean: ["assets/compiled"],
    concat: {
      js: {
        src: 'assets/src/js/*.js',
        dest: 'assets/compiled/js/script.js'
      },
      less : {
        src: 'assets/src/css/*.less',
        dest: 'assets/compiled/css/main.less'
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
         files: {
          'assets/compiled/css/main.css': 'assets/compiled/css/main.less'
        },
      }
    },
    watch: {
      scripts: {
        files: ['assets/src/js/*.js'],
        tasks: ['clean','concat'],
        // tasks: ['copy']
      }, //scrip
      styles: {
        files: ['assets/src/css/*.less'], // which files to watch
        tasks: ['clean', 'concat', 'less'],
        options: {
          nospawn: false
        }
      }
    }
  });

  grunt.registerTask('default', ['clean','concat','less', 'watch']);
};
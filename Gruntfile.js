module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    concat: {
      js: {
        src: 'assets/src/js/*.js',
        dest: 'assets/compiled/js/script.js'
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['assets/src/css/*.less'],
            dest: 'assets/compiled/css/main.css',
            ext: '.css'
          }
        ],
      }
    },
    watch: {
      styles: {
        files: ['assets/src/css/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: false
        }
      }
    }
  });

  grunt.registerTask('default', ['concat','less', 'watch']);
};
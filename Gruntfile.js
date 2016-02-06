module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "css/main.css": "cssless/main.less" // destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: ['cssless/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: false
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
};
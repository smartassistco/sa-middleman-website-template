module.exports = (grunt) => {
  const gruntConfig = {
    eslint: {
      target: ['source/javascripts/**/*.js']
    },
    stylelint: {
      all: ['source/stylesheets/**/*.css', 'source/stylesheets/**/*.scss']
    },
    spell: {
      files: ['source/**/*.erb', 'source/**/*.html']
    }
  };

  grunt.initConfig(gruntConfig);

  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-stylelint');
  grunt.loadNpmTasks('grunt-spell');

  grunt.registerTask('default', ['eslint', 'stylelint', 'spell']);
};

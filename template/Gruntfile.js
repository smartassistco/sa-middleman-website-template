module.exports = (grunt) => {
    const gruntConfig = {

        // Metadata
        pkg: grunt.file.readJSON('package.json'),

        files: {
            js: 'source/js/**/*.js',
            css: 'source/css/**/*.css'
        },

        // Task configuration
        eslint: {
            options: {
                configFile: '.eslintrc.json'
            },
            target: '<%= files.js %>'
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            strict: {
                options: {
                    import: 2
                },
                src: '<%= files.css %>'
            },
            lax: {
                options: {
                    import: false
                },
                src: '<%= files.css %>'
            }
        },
        spell: {
            files: ['source/**/*.erb', 'source/**/*.html']
        }
    };

    grunt.initConfig(gruntConfig);

    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-spell');

    grunt.registerTask('default', ['eslint', 'csslint', 'spell']);
};

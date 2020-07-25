const touch = require('touch');
const redirects = require('./redirects.json');

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
        },
        aws_s3: {
            options: {
                uploadConcurrency: 50,
                differential: true,
                accessKeyId: process.env.S3_WEBSITE_ACCESS_KEY,
                secretAccessKey: process.env.S3_WEBSITE_SECRET_KEY,
            },
            website: {
                options: {
                    region: process.env.S3_WEBSITE_REGION,
                    bucket: process.env.S3_WEBSITE_BUCKET_NAME
                },
                files: [
                    {
                        expand: true,
                        cwd: 'build',
                        src: ['**'],
                        dest: ''
                    },
                    {
                        action: 'delete',
                        cwd: 'build',
                        dest: '/'
                    }
                ]
            }
        }
    };

    // Configure S3 redirects
    touch.sync('.tmp/s3.redirect');

    // Set the S3 Redirection param on it, and add it to files
    redirects.forEach((redirect) => {
        gruntConfig.aws_s3.website.files.push({
            src: '.tmp/s3.redirect',
            dest: redirect.path,
            params: {
                WebsiteRedirectLocation: redirect.destination
            }
        });
    });

    grunt.initConfig(gruntConfig);

    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-spell');
    grunt.loadNpmTasks('grunt-aws-s3');

    grunt.registerTask('default', ['eslint', 'csslint', 'spell']);
};

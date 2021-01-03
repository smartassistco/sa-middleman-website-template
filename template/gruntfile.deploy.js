const touch = require('touch');
const redirects = require('./s3_redirects.json');

module.exports = (grunt) => {
    const gruntConfig = {
        aws_s3: {
            options: {
                uploadConcurrency: 50,
                differential: true,
                accessKeyId: process.env.S3_WEBSITE_ACCESS_KEY,
                secretAccessKey: process.env.S3_WEBSITE_SECRET_KEY,
            },
            deploy: {
                options: {
                    region: process.env.S3_WEBSITE_REGION,
                    bucket: process.env.S3_WEBSITE_BUCKET_NAME
                },
                files: [
                    {
                        expand: true,
                        cwd: 'build',
                        src: ['**', '!**/*.html', '!**/*.xml', '!**/*.txt'],
                        dest: '',
                        params: {
                            CacheControl: '86400'
                        }
                    },
                    {
                        expand: true,
                        cwd: 'build',
                        src: ['**/*.html', '**/*.xml', '**/*.txt'],
                        dest: '',
                        params: {
                            CacheControl: '600'
                        }
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
    touch.sync('.tmp-s3-redirect');

    // Set the S3 Redirection param on it, and add it to files
    redirects.forEach((redirect) => {
        gruntConfig.aws_s3.deploy.files.push({
            src: '.tmp-s3-redirect',
            dest: redirect.path,
            params: {
                WebsiteRedirectLocation: redirect.destination
            }
        });
    });

    grunt.initConfig(gruntConfig);

    grunt.loadNpmTasks('grunt-aws-s3');

    grunt.registerTask('default', []);
};

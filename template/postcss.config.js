const autoprefixer = require('autoprefixer'); // eslint-disable-line import/no-extraneous-dependencies
const cssnano = require('cssnano'); // eslint-disable-line import/no-extraneous-dependencies

const minify = process.env.NODE_ENV === 'production' ? cssnano({
    preset: [
        'default', {
            mergeLonghand: false, // https://github.com/cssnano/cssnano/issues/675
            mergeRules: false, // https://github.com/cssnano/cssnano/issues/730
        },
    ]
}) : null;

module.exports = ({file, options, env}) => ({
    inline: false,
    annotation: true,
    sourcesContent: true,
    plugins: [
        autoprefixer({
            cascade: true
        }),
        minify,
    ]
});

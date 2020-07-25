const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function generateConfig(mode) {
    function assetSource(...paths) {
        return path.join(__dirname, 'source', ...paths);
    }

    return {
        mode,
        entry: {
            scripts: assetSource('javascripts', 'main.js'),
            respond: assetSource('javascripts', 'respond.js'),
            styles: assetSource('stylesheets', 'main.css.scss'),
            'styles-deferred': assetSource('stylesheets', 'deferred.css.scss')
        },
        output: {
            path: path.join(__dirname, '.tmp', 'dist'),
            filename: 'assets/[name].js',
            publicPath: '/',
        },
        resolve: {
            modules: [
                assetSource('javascripts'),
                assetSource('stylesheets'),
                assetSource('webfonts'),
                path.join(__dirname, 'node_modules')
            ],
            extensions: ['.js', '.css', '.scss']
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    ['@babel/preset-env', {modules: false}]
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        'style-loader',
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: mode === 'development',
                            },
                        },
                        'css-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(png|jpeg|ico|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[name]-[hash:4].[ext]'
                    }
                },
            ]
        },
        optimization: {},
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'assets/[name].css'
            }),
        ],
    };
}

module.exports = (env, argv) => {
    const mode = (argv && Object.prototype.hasOwnProperty.call(argv, 'mode')) ? argv.mode : 'production';

    const config = generateConfig(mode);

    /* Production overrides */
    if (mode === 'production') {
        config.optimization.minimizer = [
            new UglifyJsPlugin({
                uglifyOptions: {}
            })
        ];

        config.plugins.push(
            new CleanWebpackPlugin()
        );
    }

    /* Development overrides */
    if (mode === 'development') {
        config.devtool = 'cheap-module-eval-source-map';

        config.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.ProgressPlugin() //todo
        );
    }

    return config;
};

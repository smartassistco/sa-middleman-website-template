const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const TerserPlugin = require('terser-webpack-plugin');

function generateConfig(mode) {
  function assetSource(...paths) {
    return path.join(__dirname, 'source', ...paths);
  }

  return {
    mode,
    entry: {
      scripts: assetSource('javascripts', 'main.js'),
      respond: assetSource('javascripts', 'vendor', 'respond.js'),
      styles: assetSource('stylesheets', 'main.css.scss'),
      'styles-deferred': assetSource('stylesheets', 'deferred.css.scss'),
      boot: assetSource('javascripts', 'boot.js')
    },
    output: {
      path: path.join(__dirname, '.tmp', 'dist'),
      filename: 'assets/[name].js',
      publicPath: '/',
      clean: true
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
                esModule: false,
              }
            },
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
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
    config.optimization.minimize = true;

    config.optimization.minimizer = [new TerserPlugin()];
  }

  /* Development overrides */
  if (mode === 'development') {
    config.devtool = 'eval-cheap-module-source-map';

    config.plugins.push(
      new webpack.ProgressPlugin()
    );

    config.stats = {
      preset: 'errors-warnings',
      version: false,
      colors: true
    };
  }

  return config;
};

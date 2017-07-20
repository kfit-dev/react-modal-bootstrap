const webpack = require('webpack');
const camelCase = require('camelcase');
const path = require('path');
const pkg = require('./package.json');

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const webpackConfig = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: pkg.name + '.js',
    library: capitalizeFirstLetter(camelCase(pkg.name)),
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    modules: ['node_modules', 'bower_components'],
    extensions: ['.jsx', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]
};

module.exports = webpackConfig;

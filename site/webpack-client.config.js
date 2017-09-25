var path = require('path');
var webpack = require('webpack');
//var resolvers = require('../scripts/resolvers');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var isDev = process.env.NODE_ENV !== 'production';

 console.log(process.cwd() + '/__site__/');
module.exports = {

  devtool: isDev ? 'cheap-eval-source-map' : 'source-map',

  entry: [
    path.join(__dirname, 'client.js')
  ].concat(isDev ? [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server'
  ] : []),
  output: {
    path: process.cwd() + '/__site__/',
    filename: isDev ? '[name].js' : '[name]-[hash].js',
    publicPath: ''
  },

  target: 'web',

  module: {
    loaders: [
      {
        test: /\.md$/,
        loader: [
          'html-loader?{"minimize":false}',
          path.join(__dirname, '../scripts/markdownLoader')
        ].join('!')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: isDev ? ['react-hot-loader', 'babel-loader'] : ['babel-loader']
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader','less-loader']
          }
        )
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
        query: { mimetype: 'image/png', name: 'images/[name]-[hash].[ext]' }
      }
    ]
  },

  resolve: {
    alias: {
      'react-context-menus/modules': path.join(__dirname, '../src'),
      'react-context-menus': path.join(__dirname, '../src')
    }
  },

  plugins: [
    new ExtractTextPlugin(
      isDev ? '[name].css' : '[name]-[hash].css'
    ),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      '__DEV__': JSON.stringify(isDev || true)
    }),
    //resolvers.resolveHasteDefines,
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  );
}

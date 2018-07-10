const path = require('path');

module.exports = {
  entry: path.resolve('./client/src/index.js'),
  output: {
    path: path.resolve('./client/public/'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.(eot|woff|woff2|ttf|png|jp(e*)g|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: 'images/[hash]-[name].[ext]'
        }
      },
      { test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.jsx?/,
        include: path.resolve('./client'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
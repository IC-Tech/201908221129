const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      }
    ]
  },
  devServer: {
    host: '192.168.8.20'
  }
});

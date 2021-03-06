const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  watch: true,
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?sourceMap',
          'sass-loader?sourceMap'
        ]
      })
    },
  ]
  },
  mode: 'development',
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ["dist"] },
      files: ['./dist/*.html'],
      browser: 'firefox developer edition',
    }),
    new ExtractTextPlugin('css/mystyles.css'),
  ]
};
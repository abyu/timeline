const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path')

module.exports = {
  entry: ['./src/app.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "cheap-eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Timeline',
      template: './src/content/index.ejs',
    }),
    new ExtractTextPlugin('styles.css'),
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      loaders: 'babel-loader',
    },{
      test: /\.(scss|css)$/,
      loader: ExtractTextPlugin.extract('css-loader!sass-loader')
    }]
  }
}

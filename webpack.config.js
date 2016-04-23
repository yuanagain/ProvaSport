var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: __dirname + "/app/main.js",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },

  module: {
    loaders: [
      { test: /\.json$/, loader: "json" },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: {
                                                                  presets: [
                                                                    'babel-preset-es2015',
                                                                    'babel-preset-react',
                                                                    'babel-preset-stage-0',
                                                                  ].map(require.resolve),
                                                                }
 },
      { { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
    ]
  },
  postcss: [
    require('autoprefixer')
  ],

  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/app/main.html"
    }),
    new webpack.HotModuleReplacementPlugin()
    new ExtractTextPlugin('app.css')
  ],

  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true
  }
}

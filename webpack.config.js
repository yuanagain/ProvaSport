var webpack = require('webpack');
const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: "./app/main.js",
  output: {
    path: path.join(__dirname, 'public'),
    filename: "bundle.js",
    publicPath: '/public/'
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
      {test: /\.css$/,
        loader: "style-loader!css-loader",
        include: path.join(__dirname, 'app', 'styles') },
    ]
  },
  postcss: [
    require('autoprefixer')
  ],

  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
            "React": "react",
        }),
  ],

  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: true,
    hot: true
  }
}

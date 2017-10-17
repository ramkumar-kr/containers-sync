var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var CopyWebpackPluginConfig = new CopyWebpackPlugin([
    {
      from: __dirname + '/src/manifest.json', to: __dirname + '/dist/manifest.json'
    },
    {
      from: __dirname + '/resources/', to: __dirname + "/dist/resources"
    }
]);

var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./src/popup/index.html",
  filename: "popup.html",
  chunks: [ "popup" ]
})

module.exports = {
    entry: {
      background: './src/background.js',
      popup: './src/popup/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
    loaders: [
       {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  plugins: [CopyWebpackPluginConfig, HtmlWebpackPluginConfig]
}

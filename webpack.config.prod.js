const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js', // single JS file to be produced in the end
    path: path.resolve(__dirname, 'dist'), // where the output should be written to (absolute path)
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // test that will be carried out on any file Webpack files to see if the rule applies or not
        use: 'ts-loader', // telling Webpack what it should use to handle the file
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'] // what file extension to add to the imports it finds
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin() // tell Webpack to clear everything in the output folder before writing to it again
  ]
};
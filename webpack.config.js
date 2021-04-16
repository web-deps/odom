const path = require('path');

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    library: 'acom',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  }
};
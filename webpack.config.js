const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
          test:/\.(s*)css$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.scss', '.css']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  devServer: {
    historyApiFallback: true
  }
};
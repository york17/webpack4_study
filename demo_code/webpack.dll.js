const webpack = require('webpack');
const {resolve} = require('path');

module.exports = {
  entry: {
    vendors: ['lodash']
  },
  output: {
    path: resolve(__dirname, 'dll'),
    filename: '[name].dll.js',
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: resolve(__dirname, 'dll/manifest.json')
    })
  ],
  mode: 'production'
}
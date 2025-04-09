const path = require('path');
const { library } = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'build'),
    library: 'guim',
  },
  mode: 'production',
};
const path = require('path')

module.exports = {
  entry: './src/serviceWorker.js',
  output: {
    filename: 'sw.js',
    path: path.resolve(__dirname, 'public'),
  },
}

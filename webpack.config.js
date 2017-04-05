module.exports = {
  entry: './src/index.js',
  output: {
    libraryTarget: 'umd',
    filename: 'index.js'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0'],
          compact: true
        }
      }
    ]
  }
};

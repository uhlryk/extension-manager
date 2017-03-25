
module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    libraryTarget: "commonjs2"
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'babel-loader!ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
};

var webpack = require('webpack');
module.exports = {
    entry: './src/index.js',
    output: {
        libraryTarget: 'umd',
        filename: './release/index.js'
    },
    module: {
        loaders: [
            {
                test: /.js/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
};

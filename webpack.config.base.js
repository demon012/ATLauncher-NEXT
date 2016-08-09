import path from 'path';

export default {
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },

    output: {
        path: path.join(__dirname, 'app'),
        filename: 'bundle.js',
        libraryTarget: 'commonjs2'
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.json'],
        packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
    },

    plugins: []
};
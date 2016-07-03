import webpack from 'webpack';
import baseConfig from './webpack.config.base';

export default {
    ...baseConfig,

    entry: ['babel-polyfill', './main.production'],

    target: 'electron-main',

    node: {
        __dirname: false,
        __filename: false
    },

    output: {
        ...baseConfig.output,
        filename: './main.js'
    },

    plugins: [
        ...baseConfig.plugins,
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]
};
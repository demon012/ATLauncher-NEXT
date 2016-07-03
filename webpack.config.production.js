import webpack from 'webpack';
import baseConfig from './webpack.config.base';

const config = {
    ...baseConfig,

    entry: './app/index',

    plugins: [
        ...baseConfig.plugins,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            }
        })
    ],

    target: 'electron-renderer'
};

export default config;
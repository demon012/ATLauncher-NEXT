import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';

export default merge(baseConfig, {
    devtool: 'cheap-module-source-map',

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
});
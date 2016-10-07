'use strict';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var srcRoot = path.resolve('./src');

var config = {
    entry: {
        // 'webpack-hot-middleware/client',
        vendor: [
            'snabbdom-jsx',
            'xstream',
            '@cycle/isolate',
            'xstream/extra/dropRepeats',
            'validator',
            'ramda'
        ],
        app: path.join(__dirname, 'src/app.js'),
    },
    output: {
        path: __dirname + '/../public',
        publicPath: '/',
        filename: '[name].js',
        // chunkFilename: '[name].js',
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 50000
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loaders: ['babel']
            },
            {
                test: /\.scss$|\.sass$/,
                loader: ExtractTextPlugin.extract('css?modules&localIdentName=[local]-[hash:base64]!sass')
            },
            { test: /\.(ttf|eot|svg|png|jpg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'}
        ]
    },
    sassLoader: {
        includePaths: ['node_modules/kickstart-node/lib-core/sass', `${srcRoot}/scss`]
    },
    resolve: {
        root: srcRoot,
        extensions: ['', '.js', '.jsx']
    }
};
// if (process.env.NODE_ENV === 'development') {
    config.output.sourceMapFilename = '[name].js.map';
    config.devtool = 'source-map';
    config.debug = true;
// } else if (process.env.NODE_ENV === 'production') {
//     var prodPlugins = [
//         new webpack.optimize.DedupePlugin(),
//         new webpack.optimize.UglifyJsPlugin({
//             compress: {
//                 warnings: false
//             }
//         })
//     ];
//     config.plugins = config.plugins.concat(prodPlugins);
// }

module.exports = config;

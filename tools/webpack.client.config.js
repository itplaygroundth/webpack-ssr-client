const {join} = require('path') 
import { RentAllAssetCopyPlugin } from './asset-copy'
import { webpackSource, webpackDestination, webpackPublicPath } from '../config/path.default'
//import   pkg from '../package.json'
//import webpack from 'webpack'
import {config,__DEV__} from './../webpack.config'
const TerserPlugin = require("terser-webpack-plugin");
import AssetsPlugin from 'assets-webpack-plugin';
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();
module.exports= 
{
    name: 'client',
    mode: 'development',
    target:'web',
    entry: [ 'babel-polyfill', join(webpackSource, 'client.js')],
    output: {
        ...config.output,
        filename: __DEV__ ? '[name].js' : '[name].[chunkhash:8].js',
        chunkFilename: __DEV__?'[name].chunk.js': '[name].[chunkhash:8].chunk.js',
      
        },

    module:{
        
             ...config.module
         
    },
    resolve: {
        extensions: [".ts", ".js"],
        fallback: {
            "crypto": false,
            "fs": false,
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "url": require.resolve("url"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "stream": require.resolve("stream-browserify"),
            "assert": require.resolve("assert"),
            "zlib": false,
            "util":false,
            "child_process": false,

        }
    },
    optimization: {
        minimize: __DEV__?false: true,
        minimizer: [ 
            new TerserPlugin(),
        ],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                },
            },
        },
    },
    plugins:[...config.plugins,
        new RentAllAssetCopyPlugin(),
        new AssetsPlugin({
            path: webpackDestination,
            filename: 'assets.json',
            prettyPrint: true,
          }),
    ]
      
        // __PROD__ ? [
        //     new webpack.optimize.UglifyJsPlugin({minimize: true}),
        //     new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.min.js'),
        // ]:[
        //   new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        // ]
    ,
    devtool: 'cheap-module-source-map',
}

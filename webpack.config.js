 
const { join, resolve } = require('path')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
//const paths = require('./config/path.default')
const zlib = require("zlib");
const CompressionPlugin = require('compression-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin');
import { webpackSource, webpackDestination, webpackPublicPath } from './config/path.default'
import  pkg from './package.json'
import  {BundleAnalyzerPlugin}  from 'webpack-bundle-analyzer';
 
const __DEV__ = !process.argv.includes('--production');
const isVerbose = process.argv.includes('--verbose');
console.log("DEV:",__DEV__);

  const config =  smp.wrap({
      name: 'config',
      output: {
        path: webpackDestination,
        publicPath: webpackPublicPath,
        pathinfo: isVerbose,
      },
       
      module:{
        rules:[
            {
                test: /\.css$/,
                exclude: [
                  resolve(__dirname, './node_modules')
                ],
                use: [
                  'isomorphic-style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      importLoaders: 1,
                      modules: false,
                      esModule: false,
                    }
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            config: resolve(__dirname, './tools/postcss.config.js'),
                        }
                    },
                  },
                ]
            },
            {
                test: /\.js?$/,
                include: [webpackSource],
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                      cacheDirectory: true,
                      babelrc: false,
                      presets: [
                        [
                          "@babel/preset-env",
                          {
                            targets: {
                              browsers: pkg.browserslist,
                            },
                            modules: false,
                            useBuiltIns: false,
                            debug: false,
                          },
                        ],
                        "@babel/preset-react",
                      ],
                    },
                  },
            },
           {
                test: /\.js$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'jsx',  // Remove this if you're not using JSX
                    target: 'es2015'  // Syntax to compile to (see options below for possible values)
                    }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
              },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file-loader',
                options: {
                    name: __DEV__ ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
                }
            },
       
        ]
    },
    plugins: [
      //new BundleAnalyzerPlugin(),
      // new CompressionPlugin({
      //   test: /\.js(\?.*)?$/i,
      //   include: [webpackSource],
      //   algorithm: "gzip",
      //   minRatio: 0.8
      // }),
      new CompressionPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      }),
        new BrotliPlugin({
        filename: '[path][base].br',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
        })
      
    ],

    devtool: __DEV__?'cheap-module-source-map':'source-map'
    })
    module.exports={config,__DEV__}
   
    

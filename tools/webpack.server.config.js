 
 
import { webpackSource, webpackDestination, webpackPublicPath } from '../config/path.default'
import   pkg from '../package.json'
import {config,__DEV__} from './../webpack.config'
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
module.exports =smp.wrap({
    name: 'server',
    mode: 'development',
    target: 'node',
    entry: './src/express/server',
    output:{
        ...config.output,
        filename:'server.js',
        libraryTarget:'commonjs2'
    },
    module:{
             ...config.module 
    },
    // plugins:[
    //     ...config.plugins
    // ],
    externals: [
        /^\.\/assets\.json$/,
        (context, request, callback) => {
          const isExternal =
            request.match(/^[@a-z][a-z/.\-0-9]*$/i) &&
            !request.match(/\.(css|less|scss|sss)$/i);
          callback(null, Boolean(isExternal));
        },
      ],
    devtool: 'source-map'
})
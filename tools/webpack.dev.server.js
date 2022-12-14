// const express = require('express')
// const path = require('path')
 
// var expressStaticGzip = require('express-static-gzip');
// var app = express();
// console.log(path.join(__dirname,'../dist/static'))
// app.use('/', expressStaticGzip(path.join(__dirname,'../dist/static'), {
//  enableBrotli: true,
//  index:false
// }));
 

// app.listen(3030,()=>{
//     console.log("server running on port http://localhost:3030")
// })
import * as path from 'path'
import * as util from 'util'
import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpack from 'webpack'
import cp from 'child_process';
import { serverPort as port } from '../config/app.default'
import { webpackPublicPath } from './../config/path.default'
import { __DEV__ } from '../webpack.config'
const exec = util.promisify(require('child_process').exec);
import clientConfig from './webpack.client.config'
import serverConfig from './webpack.server.config'
// const clientConfig = require('./webpack.client.config');
// const serverConfig = require('./webpack.server.config');
import run from './run';
import clean from './clean';
var compress = require('compression');
(async function start() {
    /**
     * just remove current build folder first
     * to avoid any previous build malfunction
     */
    //await exec(`rm -rf ${path.resolve(__dirname, '../build')}`)
    await run(clean)
    /**
     * setup hot-load module but on development only
     * this means you can run a production server with
     * NODE_ENV=production yarn serve for pre-testing
     * before golive
     */
    if (__DEV__) {
        // setting up hot reload entry and plugin to enable it
        // which already support react-hot-reload
        clientConfig.entry = [
            'webpack-hot-middleware/client',
            ...clientConfig.entry
        ]
        clientConfig.plugins.push(
            new webpack.HotModuleReplacementPlugin(),
        )
    }

    const webpackBundler = webpack([clientConfig, serverConfig])

    /**
     * below is the initlize of webpack development with BrowserSync
     * which have already been used by default tools project since legacy build tools
     * you may change BrowserSync to webpack dev server for better maintainance
     */
    const devmw = webpackDevMiddleware(webpackBundler, {
        publicPath: clientConfig.output.publicPath,
        writeToDisk: true,
    })
    const hotmw = webpackHotMiddleware(webpackBundler.compilers[0], {});
    devmw.waitUntilValid(() => {
        const bs = browserSync.create();
        bs.init({
            proxy: {
                target: `http://localhost:${port}`,
                middleware: [function(req,res,next){
                    var gzip = compress();
                     gzip(req,res,next);
               },devmw, hotmw,],
            },
        }, () => {


            console.log(`BrowserSync up and running at http://localhost:${port}`)
            console.log('starting backend service....')

            /**
             * start backend server which will be proxy from
             * browser sync and webpack dev server
             * 
             * @todo this is not a proper solution which inherit from legacy build tools
             * to improve this step you may need to modify source code of server.js
             * to be able to attach webpack dev middleware into it
             */
            console.log(path.join(serverConfig.output.path, serverConfig.output.filename))
            const server = cp.spawn('node', [path.join(serverConfig.output.path, serverConfig.output.filename)], {
                silent: false,
                env: {
                    ...process.env,
                    NODE_ENV: 'development'
                }
            })

            handleServer(server)
            server.stderr = process.stderr
            process.on('exit', () => {
                server.kill('SIGTERM')
            })
        })



    })
})()

function handleServer(server) {
    server.once('exit', (code) => {
        throw new Error(`server terminated unexpectedly with code ${code}`)
    })
    server.stdout.on('data', (data) => {
        process.stdout.write(data);
    })
    server.stderr.on('data', (data) => {
        process.stdout.write(data);
    })
}
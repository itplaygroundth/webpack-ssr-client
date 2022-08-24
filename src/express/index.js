const path=  require('path')
const express = require('express')
const webpack = require('webpack')
const expressStaticGzip = require("express-static-gzip");
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
import run from '../../tools/run'
import serverConfig from '../../tools/webpack.server.config'
import clientConfig from '../../tools/webpack.client.config'
var compression = require('compression')
import {serverHost,serverPort} from './../../config/app.default'
import {webpackDestination,webpackPublicPath} from './../../config/path.default'
import clean from '../../tools/clean'
const app = express()

async function start() {
await run(clean);
app.use(compression())
const compiler = webpack([clientConfig,serverConfig])

app.use(webpackDevMiddleware(compiler, {
	writeToDisk:true
}));
app.use(webpackHotServerMiddleware(compiler, {
	serverRendererOptions: {
		foo: 'Bar'
	}
}));
// app.use('/', expressStaticGzip(path.join(__dirname), {
// 	enableBrotli: true,
// 	index:false
//    }));

app.listen(serverPort,()=>{
    console.log(`Server started: http://${serverHost}:${serverPort}`)
})
}
start()
const path = require('path')

const __DEV__ = process.env.NODE_ENV !== 'production'

const basePath = path.resolve(__dirname, '..')
const configPath = __dirname
const webpackSource = path.join(basePath, 'src')
const webpackDestination = path.join(basePath, '/build/public/assets')
const webpackPublicPath = __DEV__ ? '/' : '/assets/'

module.exports = {
  basePath,
  configPath,
  webpackSource,
  webpackDestination,
  webpackPublicPath
}
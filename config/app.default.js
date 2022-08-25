require('dotenv').config()
const serverHost = 'localhost'
const serverPort = 6060
const apiHost = 'localhost'
const apiPort = 6061
const apiUri = 'http://' + apiHost + ':' + apiPort
const keepStoreData = true
const databaseUrl = process.env.DATABASE_URL;
const Browser = process.env.BROWSER;
module.exports = {
  serverHost,
  serverPort,
  apiHost,
  apiPort,
  apiUri,
  keepStoreData,
  databaseUrl,
  Browser

}
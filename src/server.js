import path from 'path';
import express from 'express';

import cookieParser from 'cookie-parser';
import requestLanguage from 'express-request-language';
import { renderToStringWithData } from "@apollo/client/react/ssr";
import UniversalRouter from 'universal-router';
import React from 'react';
import ReactDOM from 'react-dom/server';
import bodyParser from 'body-parser';
import PrettyError from 'pretty-error';
import assets from './assets.json';
import models from './data/models';
import routes from './routes'
//import errorPageStyle from './routes/error/ErrorPage.css';
import { serverPort as port } from './../config/app.default';
//import {webpackPublicPath} from './../config/path.default'
import Html from './components/Html';
import App from './components/App';
import { webpackPublicPath } from '../config/path.default';
var compression = require('compression')

const app = express();

 
//app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(webpackPublicPath))
//app.use('/images', express.static(path.join(__dirname, '../images')));
//app.use('/.well-known', express.static(path.join(__dirname, '../well-known')));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//
// Authentication
// -----------------------------------------------------------------------------
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
app.get('/favicon.ico', function(req, res) { 
    res.status(204);
    res.end();    
});
app.get('*', async (req, res, next) => {
    try{
        const locale = "en"
        
        const css = new Set();
        const store = {}
        const context = {
            // Enables critical path CSS rendering
            // https://github.com/kriasoft/isomorphic-style-loader
            insertCss: (...styles) => {
              // eslint-disable-next-line no-underscore-dangle
              styles.forEach(style => css.add(style._getCss()));
            },
            // Initialize a new Redux store
            // http://redux.js.org/docs/basics/UsageWithReact.html
            store,
            // Apollo Client for use with react-apollo
            client: {},
          };
        const router  = new UniversalRouter(routes, {
            ...context,
            path: req.path,
            query: req.query,
            locale,
          })
        const route = await router.resolve({path:req.path,pathname:req.path})
        if (route.redirect) {
            res.redirect(result.status || 302, result.redirect);
            return;
          }
        
        const data = {...route}
        data.children = await renderToStringWithData(<App context={context}>{route.component}</App>);
        data.styles = [
          { id: 'css', cssText: [...css].join('') },
        ];
       
    
        // // Furthermore invoked actions will be ignored, client will not receive them!
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.log('Serializing store...');
        }
        data.state = {} //context.store.getState();
       
        data.scripts = [assets.vendor.js];
        if (route.chunks) {
          data.scripts.push(...route.chunks.map(chunk => assets[chunk].js));
        }
        data.scripts.push(assets.main.js);

        data.lang = locale;
        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
        // html = "<h1>Hello World</h1>"
        res.status(route.status || 200);
        res.send(`<!doctype html>${html}`);
    }
    catch(err){
        next(err)
    }
})


//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const locale = req.language;
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: ''//errorPageStyle._getCss() 
        }]} // eslint-disable-line no-underscore-dangle
      lang={locale}
    >
      {ReactDOM.renderToString(
        // <IntlProvider locale={locale}>
        //   <ErrorPageWithoutStyle error={err} />
        // </IntlProvider>,
      )}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
models.sync().catch(err => console.error(err.stack)).then(() => {
  app.use(compression());
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
  });
});
/* eslint-enable no-console */
 
process.on('SIGINT', function() {
  console.log('SIG-INT')
  process.exit();
});
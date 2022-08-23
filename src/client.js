//const React = require('react');
//const ReactDOM = require('react-dom/client');
//const App = require('./components/App.js');


// import React from "react";
// import ReactDOM from "react-dom/client";
import App from './components/App'

// ReactDOM.render(React.createElement(App), document.getElementById('root'));
import React from "react";
import HomeComponent from "./components/Home/Home";
import HomeIndex from './components/Index/Index';

import { createRoot } from 'react-dom/client'

const context = {}
const children = <HomeIndex />
const data = {}
data.context = context
data.children = children
createRoot(document.getElementById('root')).render(<App  {...data}/>)

 

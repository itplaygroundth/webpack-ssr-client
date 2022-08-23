// const React = require('react')
// const renderToString = require('react-dom/server').renderToString;
// import App from '../components/App'
 
// module.exports = function serverRenderer({clientStats,serverStats,foo}){
//     return(req,res,next)=>{
//         res.status(200).send(`
//             <!doctype html>
//             <html>
//             <head>
//             <title>${foo}</title>
//             </head>
//             <body>
//             <div id="root">${renderToString(React.createElement(App))}</div>
//             <script src="/client.js"></script>
//             </html>
//         `)
//     }
// }
import React from "react"
import {renderToString} from 'react-dom/server'
import App from './../components/App'
const serverRenderer = ({clientStats,serverStats,foo}) =>{
 
    return(req,res,next)=>{
                res.status(200).send(`
                    <!doctype html>
                    <html>
                    <head>
                    <title>${foo}</title>
                    </head>
                    <body>
                    <div>
                    ---- server side ----
                    <div id="root"></div>
                   </div>
                   <div>
                   ----  client side ----
                    <script src="/client.js"></script>
                    </div>
                    </html>
                `)
            }
}
export default serverRenderer

const express = require('express')
const path = require('path')
 
var expressStaticGzip = require('express-static-gzip');
var app = express();
console.log(path.join(__dirname,'../dist/static'))
app.use('/', expressStaticGzip(path.join(__dirname,'../dist/static'), {
 enableBrotli: true,
 index:false
}));
 

app.listen(3030,()=>{
    console.log("server running on port http://localhost:3030")
})
var express = require('express');
var serveStatic = require('serve-static');
var app = express();

console.log(__dirname);
app.use(serveStatic(__dirname+"/app"));

app.listen(3000);
console.log('Express listening on port 3000');
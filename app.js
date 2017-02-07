var express = require('express');
var querystring = require('querystring');
const dotenv = require('dotenv').config();

const weather = require('./server/weather.js');
const imageSearch = require('./server/imageload.js');

var app = express();

app.route("/images").get((req,res)=>{
    querystringHelper(req, res, imageSearch.getImage);
});
app.route('/weather').get((req,res)=>{
    querystringHelper(req, res, weather.getWeather);
});
app.use("/", express.static('client'));
var port = process.env.PORT || 80;
app.listen(port);
console.log('Express listening on port ' + port);

function querystringHelper(req, res, cb){
    var q = req.url.indexOf("?");
    if(q > -1){
        var parsedObj = querystring.parse(req.url.slice(q + 1));
        cb(parsedObj, response=>{
            res.send(response);
        });
    }
}
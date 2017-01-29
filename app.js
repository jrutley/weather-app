var express = require('express');
var querystring = require('querystring');

const geo = require('./server/geolocation.js');
const weather = require('./server/weather.js');
const imageSearch = require('./server/imageload.js');

var app = express();

app.route("/geo").get((req,res)=>{
    const result = geo.getGeo(geoResp=>{
        res.send({location: geoResp.location});
    })
});
app.route("/images").get((req,res)=>{
    querystringHelper(req, res, imageSearch.getImage);
});
app.route('/weather').get((req,res)=>{
    querystringHelper(req, res, weather.getWeather);
});
app.use("/", express.static('client'));
app.listen(3000);
console.log('Express listening on port 3000');

function querystringHelper(req, res, cb){
    var q = req.url.indexOf("?");
    if(q > -1){
        var parsedObj = querystring.parse(req.url.slice(q + 1));
        cb(parsedObj, response=>{
            res.send(response);
        });
    }
}